const { getRepository, Repository } = require('typeorm');

class ProductService {
  async find() {
    return getRepository('Product').find({ relations: ['categories'] });
  }

  async create(params) {
    const product = new Repository('Product');
    const categories = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const categoryId of params.categories) {
      // eslint-disable-next-line no-await-in-loop
      const category = await getRepository('Category').findOne(categoryId);

      if (!category) {
        throw new Error('Categoria não existe');
      }

      categories.push(category);
    }

    product.name = params.name;
    product.barcode = params.barcode;
    product.categories = categories;

    return getRepository('Product').save(product);
  }
}

module.exports = ProductService;
