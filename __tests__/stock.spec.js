/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const {
  createConnection,
  EntitySchema,
  Repository,
  getRepository,
} = require('typeorm');

const StockService = require('../src/services/stock-service');
const ProductEntity = require('../src/entity/Product');
const InflowEntity = require('../src/entity/Inflow');
const OutflowEntity = require('../src/entity/Outflow');

require('dotenv').config({ path: '.env.test' });

describe('TESTE DE TRANSAÇÕES', () => {
  beforeAll(async () => {
    await createConnection({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      entities: [
        new EntitySchema(ProductEntity),
        new EntitySchema(InflowEntity),
        new EntitySchema(OutflowEntity),
      ],
    });

    const product = new Repository('Product');
    product.id = 1;
    product.name = 'Teste produto';
    product.barcode = '123';
    product.minQuantity = 1;
    product.maxQuantity = 10;
    product.currentQuantity = 0;

    await getRepository('Product').save(product);
  });

  afterEach(async () => {
    const product = await getRepository('Product').findOne(1);
    product.currentQuantity = 0;
    await getRepository('Product').save(product);
    await getRepository('Inflow').remove(await getRepository('Inflow').find());
    await getRepository('Outflow').remove(await getRepository('Outflow').find());
  });

  it('Inserir entrada no estoque', async () => {
    const stock = new StockService();
    await stock.insert(1, 'Inflow', 10);

    const input = await getRepository('Inflow').findOne({ relations: ['product'] });
    let product = await getRepository('Product').findOne(1);

    expect(input.quantity).toBe(10);
    expect(input.product.id).toBe(1);

    expect(product.currentQuantity).toBe(10);
    await stock.insert(1, 'Inflow', 15);
    product = await getRepository('Product').findOne(1);
    expect(product.currentQuantity).toBe(25);
  });

  it('Inserir saída no estoque', async () => {
    const product = await getRepository('Product').findOne(1);
    product.currentQuantity = 100;
    await getRepository('Product').save(product);

    const stock = new StockService();
    await stock.insert(1, 'Outflow', 10);

    const input = await getRepository('Outflow').findOne({ relations: ['product'] });
    let productUpdated = await getRepository('Product').findOne(1);

    expect(input.quantity).toBe(10);
    expect(input.product.id).toBe(1);

    expect(productUpdated.currentQuantity).toBe(90);
    await stock.insert(1, 'Outflow', 15);
    productUpdated = await getRepository('Product').findOne(1);
    expect(productUpdated.currentQuantity).toBe(75);
  });

  it('Saldo após entrada e saída no estoque', async () => {
    const stock = new StockService();
    await stock.insert(1, 'Inflow', 15);

    const input = await getRepository('Inflow').findOne({ relations: ['product'] });
    let product = await getRepository('Product').findOne(1);

    expect(input.quantity).toBe(15);
    expect(input.product.id).toBe(1);

    expect(product.currentQuantity).toBe(15);
    await stock.insert(1, 'Outflow', 10);
    const output = await getRepository('Outflow').findOne({ relations: ['product'] });

    expect(output.quantity).toBe(10);
    expect(output.product.id).toBe(1);

    product = await getRepository('Product').findOne(1);
    expect(product.currentQuantity).toBe(5);
  });
});
