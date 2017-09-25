// 事务

var client = require('../client');

let uid = 5010499;

var hostId = 5010505;
var hpKey = 'MONSTER_HP';
var monsterKey = 'MONSTER' + '_' + hostId;
let fightRecordKey = 'MONSTER_FIGHT_RECORD' + '_' + hostId;
let contributionRankKey = 'MONSTER_CONTRIBUTION_RANK' + '_' + hostId;

// return object not array
client.hgetall().exec()

function init(){
    var commands = [];
    var monsterInfo = {
        ID: 1,
        monsterId:  'monster001',
        monsterHP:  500,
        createTime: Date.now(),
        endTime:    Date.now() + 300 * 1000    
    }    
    for(var key in monsterInfo){
        commands.push(['hset',monsterKey, key, monsterInfo[key]])
    }
    
    console.log(commands);

    client.multi(commands)
    .exec((err,result)=>{
        console.log('init end',err,result);
    });
}

function test(){
    let field = 'monsterHP';
    let damage = 20;

    for(let i = 1 ; i <= 10; i++){
        client.multi()
        .hget(monsterKey,field)
        .hincrby(monsterKey,field,-20)
        .exec((err,result) =>{
            var time = Date.now();
            if(!err){
                var beforeHP = result[0][1];
                var afterHP = result[1][1];
                console.warn('round %d time %s beforeHP %s afterHP %s',i,time,beforeHP,afterHP);

                if(beforeHP > 0){
                    if(afterHP <= 0){
                        console.warn('第 %s 个人给精灵最后一击',i);
                    }
                    let fightRecord = {
                        uid:    uid,
                        username:   '吃肉的小孩',
                        damage: damage,
                        createTime: Date.now()
                    };

                    //TODO: 贡献榜单
                    //TODO: 战斗记录
                    client.multi()
                    .zincrby(contributionRankKey,damage,uid)
                    .rpush(fightRecordKey,JSON.stringify(fightRecord))
                    .exec((error, res)=>{
                        console.log('update ranking and fight record end ',uid,contributionRankKey,fightRecordKey,error,res);
                    });
                } else {
                    console.warn('精灵已经被捕捉 该次捕捉无效');
                }
            } else {
                console.error('Error: ', i,err);
            }
        });
    }
}

function getResult (){
    client.multi()
    .lrange(fightRecordKey,0,-1)
    .zrevrange(contributionRankKey,0,-1,'withscores')
    .exec((err,result)=>{
        console.log('fightRecord: ',result[0])
        console.log('contributionRank: ',result[1])
    })
}


let method = process.argv[2]; 
console.log('method: ',method);

if(method == 'init'){
    init();
} else if (method == 'test'){
    test();
} else if(method == 'res'){
    getResult();
}