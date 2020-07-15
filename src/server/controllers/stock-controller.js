const { stock } = require('../../config/service');

class StockController {
  async getInput(req, res) {
    try {
      const response = await stock.find('Inflow');
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
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
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  }

  async deleteInput(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).send('missing params [id]');
      }

      await stock.delete(req.params.id, 'Inflow');
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  }

  async getOutput(req, res) {
    try {
      const response = await stock.find('Outflow');
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
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
      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  }

  async deleteOutput(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).send('missing params [id]');
      }

      await stock.delete(req.params.id, 'Outflow');
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  }
}

module.exports = new StockController();
