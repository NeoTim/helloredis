# redis 计算两个用户之间距离实现附近的人

```
redis3.2新增了一个geohash 地理位置的算法，借此可以计算用户之间的距离，亦可以根据距离算出周围的用户

GEOADD users 
113.2278442 23.1255978 xiaoming 
113.106308 23.0088312 laowang 
113.7943267 22.9761989 kongkong 
114.0538788 22.5551603 zhangsan

获取小明、老王、张三的坐标
GEOPOS users xiaoming laowang kongkong 

计算小明和老王之间的距离，单位为米
GEODIST users xiaoming laowang 

计算小明和老王之间的距离，单位为千米
GEODIST users xiaoming laowang km

指定某个用户，某个距离附近的人，这里查找小明附近100km的人
GEORADIUSBYMEMBER users xiaoming 100 km

```
