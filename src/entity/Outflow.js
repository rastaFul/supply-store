module.exports = {
  name: 'Outflow',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    quantity: {
      type: 'int',
    },
    createdAt: {
      type: 'timestamp',
      name: 'created_at',
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
