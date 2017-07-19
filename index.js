var ioredis = require("ioredis");

var client = new ioredis({
      "port": 6379,
      "host": "127.0.0.1"
});

var pipeline = client.pipeline();

pipeline.get("myset");
pipeline.hget('myhsetnx','hhh')
pipeline.hget("myhset",'myhfield');
pipeline.exec(function(err,data){
    data.forEach(function(item){
        console.log(item);
    });
});