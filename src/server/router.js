const mainController = require('./controllers/main-controller');
const productController = require('./controllers/product-controller');

class Router {
  constructor(app) {
    app.get('/v1/ping', mainController.ping);
    app.get('/v1/product', productController.get);
    app.post('/v1/product', productController.post);
  }
}

module.exports = Router;
