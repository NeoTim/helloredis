var ioredis = require("ioredis");

var client = new ioredis({
      "port": 6379,
      "host": "127.0.0.1"
});

module.exports = client;