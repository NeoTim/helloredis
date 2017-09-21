// 事务

var client = require('../client');

for(let i = 0 ; i < 8; i++){
    client.multi()
    .get('MONSTER_HP')
    .decrby('MONSTER_HP',1)
    .exec((err,result) =>{
        var time = Date.now();
        if(!err){
            var beforeHP = result[0][1];
            var afterHP = result[1][1];
            console.log('round %d time %s beforeHP %s afterHP %s',i,time,beforeHP,afterHP);
        }
    });
}

