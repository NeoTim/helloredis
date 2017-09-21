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

/**
 result:

round 0 time 1505964197611 beforeHP 8 afterHP 7
round 1 time 1505964197611 beforeHP 7 afterHP 6
round 2 time 1505964197611 beforeHP 6 afterHP 5
round 3 time 1505964197612 beforeHP 5 afterHP 4
round 4 time 1505964197612 beforeHP 4 afterHP 3
round 5 time 1505964197612 beforeHP 3 afterHP 2
round 6 time 1505964197612 beforeHP 2 afterHP 1
round 7 time 1505964197612 beforeHP 1 afterHP 0

 */