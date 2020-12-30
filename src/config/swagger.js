module.exports.swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Seja bem vindo a API de controle de estoque de materiais de construção.'
      + 'Com essa API é possível realizar o cadastro de produtos, e adicionar entradas e saídas desses produtos.'
      + 'Abaixo você encontrará todas as informações necessárias para utilizar os recursos implementados e '
      + 'experimentá-los através do botão "Try it out" de cada rota',
    version: '0.1.0',
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
        description: 'Remover um produto(Só será permitido a exclusão de produtos que não possuem entradas/saídas cadastradas)',
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
    '/inventory/input': {
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
                    $ref: '#definitions/Inventory',
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
        description: 'Criar uma nova entrada no estoque. Caso a quantidade atualizada do produto esteja fora do estipulado, será informado um alerta no retorno da requisição',
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
                  $ref: '#definitions/Inventory',
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
    '/inventory/input/{id}': {
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
    '/inventory/output': {
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
                    $ref: '#definitions/Inventory',
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
        description: 'Criar uma nova saída no estoque. Só é permitido quantidades de saídas disponíveis no estoque'
          + 'para o produto informado. Caso a quantidade atualizada do produto esteja fora do estipulado, '
          + 'será informado um alerta no retorno da requisição',
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
                  $ref: '#definitions/Inventory',
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
    '/inventory/output/{id}': {
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
    Inventory: {
      type: 'object',
      properties: {
        quantity: {
          type: 'integer',
        },
      },
    },
  },
};
