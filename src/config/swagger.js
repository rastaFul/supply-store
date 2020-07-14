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
          'Product',
        ],
        description: 'Buscar todos os produtos cadastrados',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'Lista de produtos',
            schema: {
              type: 'array',
              items: {
                allOf: [
                  {
                    $ref: '#definitions/Product',
                  },
                  {
                    type: 'object',
                    properties: {
                      currentQuantity: {
                        type: 'integer',
                      },
                      id: {
                        type: 'integer',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      post: {
        tags: [
          'Product',
        ],
        description: 'Criar um novo produto',
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
                  type: 'object',
                  properties: {
                    currentQuantity: {
                      type: 'integer',
                    },
                  },
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
              allOf: [
                {
                  $ref: '#definitions/Product',
                },
                {
                  type: 'object',
                  properties: {
                    currentQuantity: {
                      type: 'integer',
                    },
                    id: {
                      type: 'integer',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    '/product/{id}': {
      put: {
        tags: [
          'Product',
        ],
        description: 'Update a product',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'ProductId',
            description: 'Key a product',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Properties of product',
            required: true,
            schema: {
              allOf: [
                {
                  $ref: '#/definitions/Product',
                },
              ],
            },
          },
        ],
        responses: {
          204: {
            description: 'Product updated',
            schema: {
              allOf: [
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                  },
                },
                {
                  $ref: '#definitions/Product',
                },
              ],
            },
          },
        },
      },
      delete: {
        tags: [
          'Product',
        ],
        description: 'Remove a product',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'ProductId',
            description: 'Key a product',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          204: {
            description: 'Product removed',
            schema: {
              allOf: [
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                  },
                },
                {
                  $ref: '#definitions/Product',
                },
              ],
            },
          },
        },
      },
    },
    '/stock/input': {
      get: {
        tags: [
          'Estoque',
        ],
        description: 'Buscar todos as movimentações de entrada do estoque',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'Lista de todas as movimentações de entrada do estoque',
            schema: {
              type: 'array',
              items: {
                allOf: [
                  {
                    $ref: '#definitions/Stock',
                  },
                  {
                    type: 'object',
                    properties: {
                      product: {
                        type: 'object',
                        schema: {
                          allOf: [
                            {
                              $ref: '#definitions/Product',
                            },
                            {
                              type: 'object',
                              properties: {
                                currentQuantity: {
                                  type: 'integer',
                                },
                                id: {
                                  type: 'integer',
                                },
                              },
                            },
                          ],
                        },
                      },
                      id: {
                        type: 'integer',
                      },
                      createdAt: {
                        type: 'string',
                      },
                    },
                  },
                ],
              },
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
        barcode: {
          type: 'string',
        },
      },
    },
    Stock: {
      type: 'object',
      properties: {
        quantity: {
          type: 'integer',
        },
      },
    },
  },
};
