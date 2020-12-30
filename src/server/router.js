const mainController = require('./controllers/main-controller');
const productController = require('./controllers/product-controller');
const inventoryController = require('./controllers/inventory-controller');

class Router {
  constructor(app) {
    app.get('/v1/ping', mainController.ping);

    app.get('/v1/product', productController.get);
    app.post('/v1/product', productController.post);
    app.put('/v1/product/:id', productController.put);
    app.delete('/v1/product/:id', productController.delete);

    app.get('/v1/inventory/input', inventoryController.getInput);
    app.post('/v1/inventory/input', inventoryController.postInput);
    app.delete('/v1/inventory/input/:id', inventoryController.deleteInput);

    app.get('/v1/inventory/output', inventoryController.getOutput);
    app.post('/v1/inventory/output', inventoryController.postOutput);
    app.delete('/v1/inventory/output/:id', inventoryController.deleteOutput);
  }
}

module.exports = Router;
