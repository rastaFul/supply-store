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
    minQuantity: {
      type: 'int',
    },
    maxQuantity: {
      type: 'int',
    },
    currentQuantity: {
      type: 'int',
    },
  },
};
