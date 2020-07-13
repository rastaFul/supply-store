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

  async post(req, res) {
    try {
      if (!req.body.name) {
        return res.status(400).send('missing params [name]');
      }

      const response = await product.create(req.body);
      return res.status(201).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send('server error');
    }
  }
}

module.exports = new ProductController();
