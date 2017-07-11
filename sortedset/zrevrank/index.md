# zrevrank

## Usage
ZREVRANK key member

from 0 to max

## 时间复杂度:
O(log(N))

返回值:
如果 member 是有序集 key 的成员，返回 member 的排名 ,从0～Max。
如果 member 不是有序集 key 的成员，返回 nil 。

## Demo

```
redis 127.0.0.1:6379> ZRANGE salary 0 -1 WITHSCORES     # 测试数据
1) "jack"
2) "2000"
3) "peter"
4) "3500"
5) "tom"
6) "5000"

redis> ZREVRANK salary peter     # peter 的工资排第二
(integer) 1

redis> ZREVRANK salary tom       # tom 的工资最高
(integer) 0

redis> ZREVRANK salary haha      # haha 不在有序集中
nil

```

## 说明
[参考资料](http://redisdoc.com/sorted_set/zrevrank.html)