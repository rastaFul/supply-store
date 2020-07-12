require('dotenv').config();
const Server = require('./server/server');

(async () => {
  const app = new Server();
  app.listen();
})();
