module.exports.swaggerDocument = {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: 'Controle de estoque de materiais de construção',
  },
  basePath: '/v1',
  schemes: ['http'],
  paths: {
    '/product': {
      get: {
        tags: [
          'Produto',
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
          'Produto',
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
            description: 'Propriedades do produto',
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
            description: 'Produto criado',
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
          'Produto',
        ],
        description: 'Atualizar um produto',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Chave do produto',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Propriedades do produto',
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
            description: 'Produto atualizado',
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
          'Produto',
        ],
        description: 'Remover um produto',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Chave do produto',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          204: {
            description: 'Produto removido',
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
      post: {
        tags: [
          'Estoque',
        ],
        description: 'Criar uma nova entrada no estoque',
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
            description: 'Propriedades do objeto de movimentação do estoque',
            required: true,
            schema: {
              allOf: [
                {
                  $ref: '#definitions/Stock',
                },
                {
                  type: 'object',
                  properties: {
                    productId: {
                      type: 'integer',
                    },
                  },
                },
                {
                  required: [
                    'productId',
                    'quantity',
                  ],
                },
              ],
            },
          },
        ],
        responses: {
          201: {
            description: '',
            schema: {
              type: 'object',
              properties: {
                alert: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/stock/input/{id}': {
      delete: {
        tags: [
          'Estoque',
        ],
        description: 'Remover uma entrada de estoque',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Chave da movimentação de estoque',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          204: {
            description: 'Movimentação removida',
          },
        },
      },
    },
    '/stock/output': {
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
      post: {
        tags: [
          'Estoque',
        ],
        description: 'Criar uma nova entrada no estoque',
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
            description: 'Propriedades do objeto de movimentação do estoque',
            required: true,
            schema: {
              allOf: [
                {
                  $ref: '#definitions/Stock',
                },
                {
                  type: 'object',
                  properties: {
                    productId: {
                      type: 'integer',
                    },
                  },
                },
                {
                  required: [
                    'productId',
                    'quantity',
                  ],
                },
              ],
            },
          },
        ],
        responses: {
          201: {
            description: '',
            schema: {
              type: 'object',
              properties: {
                alert: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/stock/output/{id}': {
      delete: {
        tags: [
          'Estoque',
        ],
        description: 'Remover uma saída de estoque',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Chave da movimentação de estoque',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          204: {
            description: 'Movimentação removida',
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
