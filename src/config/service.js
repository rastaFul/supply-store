const ProductService = require('../services/product-service');
const InventoryService = require('../services/inventory-service');

module.exports.product = new ProductService();
module.exports.inventory = new InventoryService();
