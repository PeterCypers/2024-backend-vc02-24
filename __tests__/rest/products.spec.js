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
}

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

    const url = '/api/products';
    describe('GET /api/products', ()=> {

        //testdata toevoegen
        beforeAll(async() => {
            await knex(tables.product).insert(data.products);
        });

        afterAll(async () => {
            await knex(tables.product).whereIn('productid', dataToDelete.products).delete();
        });

        it('should return 200 and all transactions', async()=>{
            const response = await request.get(url);
            expect(response.status).toBe(200);
        })
    });
})