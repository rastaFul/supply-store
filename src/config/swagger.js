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
        tags: [
          'product',
        ],
        description: 'Return all products',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'Product created',
            schema: {
              type: 'array',
              items: {
                $ref: '#definitions/Product',
              },
            },
          },
        },
      },
      post: {
        tags: [
          'product',
        ],
        description: 'Create a new product',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: {
              allOf: [
                {
                  $ref: '#/definitions/Product',
                },
                {
                  required: [
                    'name',
                    'minQuantity',
                    'maxQuantity',
                  ],
                },
              ],
            },
          },
        ],
        responses: {
          201: {
            description: 'Product created',
            schema: {
              $ref: '#definitions/Product',
            },
          },
        },
      },
    },
  },
  definitions: {
    Product: {
      type: 'object',
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
