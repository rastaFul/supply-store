const { getRepository } = require('typeorm');

class StockService {
  findInput() {
    return getRepository('Inflow').find({ relations: ['product'] });
  }

  findOutput() {
    return getRepository('Outflow').find({ relations: ['product'] });
  }
}

module.exports = StockService;
