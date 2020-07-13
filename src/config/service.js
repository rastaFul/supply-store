const ProductService = require('../services/product-service');
const StockService = require('../services/stock-service');

module.exports.product = new ProductService();
module.exports.stock = new StockService();
