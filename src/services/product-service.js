const { getRepository } = require('typeorm');

class ProductService {
  async find() {
    return getRepository('Product').find({ relations: ['categories'] });
  }
}

module.exports = ProductService;
