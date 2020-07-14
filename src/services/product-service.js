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
    product.minQuantity = params.minQuantity;
    product.maxQuantity = params.maxQuantity;
    product.currentQuantity = params.currentQuantity || 0;

    product.barcode = params.barcode;
    product.categories = categories;

    return getRepository('Product').save(product);
  }

  async update(id, params) {
    const product = await getRepository('Product').findOne({ where: { id }, relations: ['categories'] });
    const categories = [];

    if (!product) {
      throw new Error('Produto informado não existe');
    }

    product.name = params.name || product.name;
    product.barcode = params.barcode || product.barcode;
    product.minQuantity = params.minQuantity || product.minQuantity;
    product.maxQuantity = params.maxQuantity || product.maxQuantity;

    if (params.categories) {
      // eslint-disable-next-line no-restricted-syntax
      for (const categoryId of params.categories) {
        // eslint-disable-next-line no-await-in-loop
        const category = await getRepository('Category').findOne(categoryId);

        if (!category) {
          throw new Error('Categoria não existe');
        }

        categories.push(category);
      }
    }

    product.categories = params.categories ? categories : product.categories;

    return getRepository('Product').save(product);
  }

  async remove(id) {
    const product = await getRepository('Product').findOne({ where: { id }, relations: ['categories'] });

    if (!product) {
      throw new Error('Produto informado não existe');
    }

    await getRepository('Product').remove(product);
  }
}

module.exports = ProductService;
