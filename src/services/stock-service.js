const { getRepository, Repository, getManager } = require('typeorm');

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

    let itemInserted;

    await getManager().transaction(async (manager) => {
      itemInserted = await manager.getRepository(entity).save(repository);
      await this.afterInsertRemove(manager, entity, productId, quantity);
    });

    return itemInserted;
  }

  async delete(id, entity) {
    const item = getRepository(entity).findOne(id, { relations: 'product' });

    if (!item) {
      throw new Error('Item não existe');
    }
    await getManager().transaction(async (manager) => {
      const itemRemoved = await manager.getRepository(entity).remove(item);
      await this.afterInsertRemove(manager, entity, itemRemoved.product.id, itemRemoved.quantity);
    });

  }

  async afterInsertRemove(manager, entity, productId, quantity) {
    const product = await getRepository('Product').findOne(productId);
    const currentQuantity = entity === 'Inflow' ? product.currentQuantity + quantity : product.currentQuantity - quantity;
    await manager.getRepository('Product').update(productId, { currentQuantity });
  }
}

module.exports = StockService;
