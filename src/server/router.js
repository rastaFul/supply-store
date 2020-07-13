const mainController = require('./controllers/main-controller');
const productController = require('./controllers/product-controller');
const stockController = require('./controllers/stock-controller');

class Router {
  constructor(app) {
    app.get('/v1/ping', mainController.ping);

    app.get('/v1/product', productController.get);
    app.post('/v1/product', productController.post);
    app.put('/v1/product/:id', productController.put);
    app.delete('/v1/product/:id', productController.delete);
    app.get('/v1/stock/input', stockController.getInputs);
    app.get('/v1/stock/output', stockController.getOutputs);
  }
}

module.exports = Router;
