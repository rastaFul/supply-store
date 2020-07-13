const { getRepository, Repository } = require('typeorm');

class StockService {
  find(entity) {
    return getRepository(entity).find({ relations: ['product'] });
  }

  async insert(productId, entity, quantity) {
    const product = await getRepository('Product').findOne(productId);

    if (!product) {
      throw new Error('Produto informado não existe');
    }

    const repository = new Repository(entity);
    repository.product = product;
    repository.quantity = quantity;
    repository.createdAt = new Date();

    return getRepository('Product').save(repository);
  }

  async delete(id, entity) {
    const item = getRepository(entity).findOne(id);

    if (!item) {
      throw new Error('Item não existe');
    }

    await getRepository(entity).remove(item);
  }
}

module.exports = StockService;
