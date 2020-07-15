const { getRepository, Repository, getManager } = require('typeorm');

class StockService {
  find(entity) {
    return getRepository(entity).find({ relations: ['product'] });
  }

  async insert(productId, entity, quantity) {
    const product = await getRepository('Product').findOne(productId);
    let movement = {};
    if (!product) {
      throw new Error('Produto informado não existe');
    }

    const repository = new Repository(entity);
    repository.product = product;
    repository.quantity = quantity;
    repository.createdAt = new Date();


    await getManager().transaction(async (manager) => {
      movement = await manager.getRepository(entity).save(repository);
      movement.product = await this.afterInsertRemove(manager, entity, productId, quantity);
    });
    return movement;
  }

  async delete(id, entity) {
    const item = getRepository(entity).findOne(id, { relations: 'product' });
    let movement = {};

    if (!item) {
      throw new Error('Item não existe');
    }
    await getManager().transaction(async (manager) => {
      movement = await manager.getRepository(entity).remove(item);
      movement.product = await this.afterInsertRemove(manager, entity, movement.product.id,
        movement.quantity);
    });
    return movement;
  }

  async afterInsertRemove(manager, entity, productId, quantity) {
    const product = await getRepository('Product').findOne(productId);
    const currentQuantity = entity === 'Inflow' ? product.currentQuantity + quantity : product.currentQuantity - quantity;
    return manager.getRepository('Product').update(productId, { currentQuantity });
  }
}

module.exports = StockService;
