const { stock } = require('../../config/service');

class StockController {
  async getInputs(req, res) {
    try {
      const response = await stock.findInput();
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  }

  async getOutputs(req, res) {
    try {
      const response = await stock.findOutput();
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  }
}

module.exports = new StockController();
