const { inventory } = require('../../config/service');
const { MissingParams } = require('../../error/missing-params');
const { httpCustom } = require('../error/http');

class inventoryController {
  async getInput(req, res) {
    try {
      const response = await inventory.find('Inflow');
      return res.status(200).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async postInput(req, res) {
    try {
      const requiredParams = ['productId', 'quantity'];

      // eslint-disable-next-line no-restricted-syntax
      for (const param of requiredParams) {
        if (!req.body[param]) {
          throw new MissingParams(param);
        }
      }

      const transaction = await inventory.insert(req.body.productId, 'Inflow', req.body.quantity);
      const response = inventory.checkProductInventory(transaction.product, 'input');
      return res.status(201).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async deleteInput(req, res) {
    try {
      if (!req.params.id) {
        throw new MissingParams('id');
      }

      await inventory.delete(req.params.id, 'Inflow');
      return res.status(204).send();
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async getOutput(req, res) {
    try {
      const response = await inventory.find('Outflow');
      return res.status(200).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async postOutput(req, res) {
    try {
      const requiredParams = ['productId', 'quantity'];

      // eslint-disable-next-line no-restricted-syntax
      for (const param of requiredParams) {
        if (!req.body[param]) {
          throw new MissingParams(param);
        }
      }

      const moviment = await inventory.insert(req.body.productId, 'Outflow', req.body.quantity);
      const response = inventory.checkProductInventory(moviment.product, 'output');
      return res.status(201).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async deleteOutput(req, res) {
    try {
      if (!req.params.id) {
        throw new MissingParams('id');
      }

      await inventory.delete(req.params.id, 'Outflow');
      return res.status(204).send();
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }
}

module.exports = new inventoryController();
