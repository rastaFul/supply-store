module.exports = {
  name: 'Stock',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    quantity: {
      type: 'int',
    },
    updatedAt: {
      type: 'timestamp',
      name: 'updated_at',
    },
  },
  relations: {
    product: {
      target: 'Product',
      type: 'many-to-one',
      joinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
      },
    },
  },
};
