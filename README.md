# helloredis
redis demo


## Sorted Set 有序集合
### [zunionstore](sortedset/zunionstore/index.md)

合并 一个或者多个sorted set到一个sorted set中。

### [zrevrank](sortedset/zrevrank/index.md)

返回有序集key 中成员member的排名,其中有序集成员按score值递减(从大到小)排序。


### [transaction](transaction/index.md)
解决了一个问题，node高并发情况下 get到同一个key的值，然后set 数据会有错误。之前因为处理这个问题，还专门添加了队列操作。

