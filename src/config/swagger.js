module.exports.swaggerDocument = {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: 'supply-stock',
  },
  basePath: '/v1',
  schemes: ['http'],
  paths: {
    '/product': {
      get: {
        description: 'Return all products',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'A list of products',
            schema: {
              type: 'array',
              items: {
                $ref: '#definitions/product',
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    product: {
      type: 'object',
      required: [
        'name',
        'minQuantity',
        'maxQuantity',
      ],
      properties: {
        name: {
          type: 'string',
        },
        minQuantity: {
          type: 'integer',
        },
        maxQuantity: {
          type: 'integer',
        },
        currentQuantity: {
          type: 'integer',
        },
        barcode: {
          type: 'string',
        },
      },
    },
  },
};
