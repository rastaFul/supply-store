const express = require('express');
const Router = require('./router');

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
    this.middleware();
    new Router(this.server);
  }

  middleware() {
    this.server.use(express.json({ limit: '10mb' }));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.info(`server listen at port ${this.port}`);
    });
  }
}

module.exports = Server;
