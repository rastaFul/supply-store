module.exports = {
  name: 'Product',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    barcode: {
      type: 'varchar',
    },
  },
  relations: {
    categories: {
      target: 'Category',
      type: 'many-to-many',
      joinTable: {
        name: 'product_category',
        joinColumn: {
          name: 'product_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'category_id',
          referencedColumnName: 'id',
        },
      },
      cascade: true,
    },
  },
};
