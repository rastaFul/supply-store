require('dotenv').config();
require('reflect-metadata');
const { createConnection } = require('typeorm');
const Server = require('./server/server');

(async () => {
  await createConnection();
  const app = new Server();
  app.listen();
})();
