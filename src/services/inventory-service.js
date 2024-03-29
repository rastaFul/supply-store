const { getRepository, Repository, getManager } = require('typeorm');
const { NotAllowed } = require('../error/not-allowed');
const { InvalidParams } = require('../error/invalid-params');

class InventoryService {
  find(entity) {
    return getRepository(entity).find({ relations: ['product'] });
  }

  async insert(productId, entity, quantity) {
    const product = await getRepository('Product').findOne(productId);
    let movement = {};
    if (!product) {
      throw new InvalidParams('productId');
    }

    if (entity === 'Outflow' && product.currentQuantity - quantity < 0) {
      throw new NotAllowed('Não há produto suficiente em estoque');
    }

    const repository = new Repository(entity);
    repository.product = product;
    repository.quantity = quantity;
    repository.createdAt = new Date();


    await getManager().transaction(async (manager) => {
      movement = await manager.getRepository(entity).save(repository);
      movement.product = await this.afterInsert(manager, entity, productId, quantity);
    });
    return movement;
  }

  async delete(id, entity) {
    const item = getRepository(entity).findOne(id, { relations: 'product' });
    let movement = {};

    if (!item) {
      throw new InvalidParams('id');
    }
    await getManager().transaction(async (manager) => {
      movement = await manager.getRepository(entity).remove(item);
      movement.product = await this.afterDelete(manager, entity, movement.product.id,
        movement.quantity);
    });
    return movement;
  }

  async afterInsert(manager, entity, productId, quantity) {
    const product = await getRepository('Product').findOne(productId);
    const currentQuantity = entity === 'Inflow' ? product.currentQuantity + quantity : product.currentQuantity - quantity;
    return manager.getRepository('Product').update(productId, { currentQuantity });
  }

  async afterDelete(manager, entity, productId, quantity) {
    const product = await getRepository('Product').findOne(productId);
    const currentQuantity = entity === 'Inflow' ? product.currentQuantity - quantity : product.currentQuantity + quantity;
    return manager.getRepository('Product').update(productId, { currentQuantity });
  }

  checkProductInventory(product, moviment) {
    const message = moviment === 'input' ? 'Produto com quantidade abaixo do esperado' : 'Produto com quantidade acima do esperado';
    return {
      alert: product.currentQuantity < product.minQuantity || product.currentQuantity > product.maxQuantity ? message : '',
    };
  }
}

module.exports = InventoryService;
