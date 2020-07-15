const { stock } = require('../../config/service');
const { httpCustom } = require('../error/http');

class StockController {
  async getInput(req, res) {
    try {
      const response = await stock.find('Inflow');
      return res.status(200).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async postInput(req, res) {
    try {
      if (!req.params.productId) {
        res.status(400).send('missing params [productId]');
      }

      if (!req.body.quantity) {
        res.status(400).send('missing params [quantity]');
      }

      const moviment = await stock.insert(req.params.productId, 'Inflow', req.body.quantity);
      const response = stock.checkProductStock(moviment.product, 'input');
      return res.status(201).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async deleteInput(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).send('missing params [id]');
      }

      await stock.delete(req.params.id, 'Inflow');
      return res.status(204).send();
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async getOutput(req, res) {
    try {
      const response = await stock.find('Outflow');
      return res.status(200).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async postOutput(req, res) {
    try {
      if (!req.params.productId) {
        res.status(400).send('missing params [productId]');
      }

      if (!req.body.quantity) {
        res.status(400).send('missing params [quantity]');
      }

      const moviment = await stock.insert(req.params.productId, 'Outflow', req.body.quantity);
      const response = stock.checkProductStock(moviment.product, 'output');
      return res.status(201).send(response);
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }

  async deleteOutput(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).send('missing params [id]');
      }

      await stock.delete(req.params.id, 'Outflow');
      return res.status(204).send();
    } catch (error) {
      const response = httpCustom.handleErrors(error);
      return res.status(response.code).send(response.message);
    }
  }
}

module.exports = new StockController();
