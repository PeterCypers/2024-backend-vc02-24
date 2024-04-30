const supertest = require('supertest');
const createServer = require('../../src/createServer');
const { tables, getKnex } = require('../../src/data');

const data = {
    // int(pk)/double/varchar/varchar/int
    
    products: [
        { productid: 1, eenheidsprijs: 5.0, levermethode: "STOCK", naam: "Gerookte Snacks", stock: 1 },
        { productid: 2, eenheidsprijs: 32000, levermethode: "STOCK", naam: "Guitaar", stock: 100 },
        { productid: 3, eenheidsprijs: 256, levermethode: "STOCK", naam: "Paprika Chips", stock: 200 },
        { productid: 4, eenheidsprijs: 326.75, levermethode: "STOCK", naam: "Limonade Blik", stock: 1000 },
        { productid: 5, eenheidsprijs: 50, levermethode: "STOCK", naam: "Stella Artois", stock: 356 }
    ]

};

const dataToDelete = {
    products: [1, 2, 3, 4, 5],
};

describe("Products", () => {
    let server;
    let request;
    let knex;

    
    beforeAll(async() => {
        server = await createServer();
        request = supertest(server.getApp().callback());
        knex = getKnex();
    });

    afterAll(async() => {
        await server.stop();
    });

    //test get alle producten
    const url = '/api/products';
    describe('GET /api/products', ()=> {

        //testdata toevoegen
        beforeAll(async() => {
            await knex(tables.product).insert(data.products);
        });
        //testdata verwijderen
        afterAll(async () => {
            await knex(tables.product).whereIn('productid', dataToDelete.products).delete();
        });

        //test happy flow
        it('should return 200 and all transactions', async()=>{
            const response = await request.get(url);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(5);

            expect(response.body.data).toEqual(expect.arrayContaining([{
                productid: 1,
                eenheidsprijs: 5.0,
                levermethode: "STOCK",
                naam: "Gerookte Snacks",
                stock: 1,
              }, {
                productid: 2,
                eenheidsprijs: 32000,
                levermethode: "STOCK",
                naam: "Guitaar",
                stock: 100,
              }, {
                productid: 3,
                eenheidsprijs: 256,
                levermethode: "STOCK",
                naam: "Paprika Chips",
                stock: 200,
              }, {
                productid: 4,
                eenheidsprijs: 326.75,
                levermethode: "STOCK",
                naam: "Limonade Blik",
                stock: 1000,
              } ,{
                productid: 5,
                eenheidsprijs: 50,
                levermethode: "STOCK",
                naam: "Stella Artois",
                stock: 356,
              }]));
        });

        //test bad request
        it('should 400 when given an argument', async () => {
            const response = await request.get(`${url}?invalid=true`);
      
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.query).toHaveProperty('invalid');
          });
    });

    describe('GET /api/products/:id', () => {

        //testdata toevoegen
        beforeAll(async () => {
          await knex(tables.product).insert(data.products[0]);
        });
        //testdata verwijderen
        afterAll(async () => {
          await knex(tables.product)
            .whereIn('productid', dataToDelete.products)
            .delete();
        });
        //test
        it('should 200 and return the requested product', async () => {
          const response = await request.get(`${url}/1`);
    
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({
            productid: 1,
            eenheidsprijs: 5.0,
            levermethode: "STOCK",
            naam: "Gerookte Snacks",
            stock: 1,
          });
        });
    
        it('should 404 when requesting non existing product', async () => {
          const response = await request.get(`${url}/2`);
    
          expect(response.statusCode).toBe(404);
          expect(response.body).toMatchObject({
            code: 'NOT_FOUND',
            message: 'No product with id 2 exists',
            details: {
              id: 2,
            },
          });
          expect(response.body.stack).toBeTruthy();
        });
    
        it('should 400 with invalid product id', async () => {
          const response = await request.get(`${url}/invalid`);
    
          expect(response.statusCode).toBe(400);
          expect(response.body.code).toBe('VALIDATION_FAILED');
          expect(response.body.details.params).toHaveProperty('id');
        });
      });
});