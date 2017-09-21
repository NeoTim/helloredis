# helloredis
redis demo


## Sorted Set 有序集合
### [zunionstore](sortedset/zunionstore/index.md)

合并 一个或者多个sorted set到一个sorted set中。

### [zrevrank](sortedset/zrevrank/index.md)

返回有序集key 中成员member的排名,其中有序集成员按score值递减(从大到小)排序。


### 事务

```

解决了一个问题，node高并发情况下 get到同一个key的值，然后set 数据会有错误。之前因为处理这个问题，还专门添加了队列操作。

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

result:

round 0 time 1505964197611 beforeHP 8 afterHP 7
round 1 time 1505964197611 beforeHP 7 afterHP 6
round 2 time 1505964197611 beforeHP 6 afterHP 5
round 3 time 1505964197612 beforeHP 5 afterHP 4
round 4 time 1505964197612 beforeHP 4 afterHP 3
round 5 time 1505964197612 beforeHP 3 afterHP 2
round 6 time 1505964197612 beforeHP 2 afterHP 1
round 7 time 1505964197612 beforeHP 1 afterHP 0

```
