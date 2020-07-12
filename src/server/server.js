const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./router');

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
    this.middleware();
    new Router(this.server);
  }

  middleware() {
    this.server.use(bodyParser.json());
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`server listen at port ${this.port}`);
    });
  }
}

module.exports = Server;
