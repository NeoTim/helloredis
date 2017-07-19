# Pipeline 管道

- Redis是一种基于客户端-服务端模型以及请求/响应协议的TCP服务。
- 这意味着通常情况下一个请求会遵循以下步骤：
    - 客户端向服务端发送一个查询请求，并监听Socket返回，通常是以阻塞模式，等待服务端响应。
    - 服务端处理命令，并将结果返回给客户端
- 客户端和服务器通过网络进行连接。这个连接可以很快（loopback接口）或很慢（建立了一个多次跳转的网络连接）。无论网络延如何延时，数据包总是能从客户端到达服务器，并从服务器返回数据回复客户端。
- 这个时间被称之为 RTT (Round Trip Time - 往返时间). 当客户端需要在一个批处理中执行多次请求时很容易看到这是如何影响性能的（例如添加许多元素到同一个list，或者用很多Keys填充数据库）。例如，如果RTT时间是250毫秒（在一个很慢的连接下），即使服务器每秒能处理100k的请求数，我们每秒最多也只能处理4个请求。

## 管道解决的问题
- 一次请求/响应服务器能实现处理新的请求即使旧的请求还未被响应。这样就可以将多个命令发送到服务器，而不用等待回复，最后在一个步骤中读取该答复。

## 重要说明
- 使用管道发送命令时，服务器将被迫回复一个<mark>队列</mark>答复，占用很多<mark>内存</mark>。所以，如果你需要发送大量的命令，最好是把他们按照合理数量分批次的处理，例如10K的命令，读回复，然后再发送另一个10k的命令，等等。这样速度几乎是相同的，但是在回复这10k命令队列需要非常大量的内存用来组织返回数据内容

## Demo

```

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


# Prints
#1 [ null, '1' ]
#2 [ null, '1' ]
#3 [ null, '[{"id":1,"age":20},{"id":2,"age":40}]' ]

```