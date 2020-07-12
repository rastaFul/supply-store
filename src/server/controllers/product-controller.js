const { product } = require('../../config/service');

class ProductController {
  async get(req, res) {
    try {
      const response = await product.find();
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  }
}

module.exports = new ProductController();
