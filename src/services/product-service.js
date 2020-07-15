const { getRepository, Repository } = require('typeorm');
const { InvalidParams } = require('../error/invalid-params');

class ProductService {
  async find() {
    return getRepository('Product').find();
  }

  async create(params) {
    const product = new Repository('Product');

    product.name = params.name;
    product.minQuantity = params.minQuantity;
    product.maxQuantity = params.maxQuantity;
    product.currentQuantity = params.currentQuantity || 0;

    product.barcode = params.barcode;

    return getRepository('Product').save(product);
  }

  async update(id, params) {
    const product = await getRepository('Product').findOne({ where: { id } });

    if (!product) {
      throw new InvalidParams('id');
    }

    product.name = params.name || product.name;
    product.barcode = params.barcode || product.barcode;
    product.minQuantity = params.minQuantity || product.minQuantity;
    product.maxQuantity = params.maxQuantity || product.maxQuantity;

    return getRepository('Product').save(product);
  }

  async remove(id) {
    const product = await getRepository('Product').findOne({ where: { id } });

    if (!product) {
      throw new InvalidParams('id');
    }

    await getRepository('Product').remove(product);
  }
}

module.exports = ProductService;
