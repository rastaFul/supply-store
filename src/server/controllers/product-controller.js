const { product } = require('../../config/service');
const { MissingParams } = require('../../error/missing-params');
const { httpCustom } = require('../error/http');

class ProductController {
  async get(req, res) {
    try {
      const response = await product.find();
      return res.status(200).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async post(req, res) {
    try {
      const requiredParams = ['name', 'minQuantity', 'maxQuantity'];

      // eslint-disable-next-line no-restricted-syntax
      for (const param of requiredParams) {
        if (!req.body[param]) {
          throw new MissingParams(param);
        }
      }

      await product.create(req.body);
      return res.status(201).send();
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async put(req, res) {
    try {
      if (!req.params.id) {
        throw new MissingParams('id');
      }

      const response = await product.update(req.params.id, req.body);
      return res.status(204).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        throw new MissingParams('id');
      }

      await product.remove(req.params.id);
      return res.status(204).send();
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }
}

module.exports = new ProductController();
