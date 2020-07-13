const { product } = require('../../config/service');

class ProductController {
  async get(req, res) {
    try {
      const response = await product.find();
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  }

  async post(req, res) {
    try {
      const requiredParams = ['name', 'minQuantity', 'maxQuantity'];

      // eslint-disable-next-line no-restricted-syntax
      for (const param of requiredParams) {
        if (!req.body[param]) {
          return res.status(400).send(`missing params [${param}]`);
        }
      }

      const response = await product.create(req.body);
      return res.status(201).send(response);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  }

  async put(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send('missing params [id]');
      }

      const response = await product.update(req.params.id, req.body);
      return res.status(201).send(response);
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send('missing params [id]');
      }

      await product.remove(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  }
}

module.exports = new ProductController();
