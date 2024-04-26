const supertest = require('supertest');
const createServer = require('../../src/createServer');
const { tables, getKnex } = require('../../src/data');

const data = {
  gebruikers: [
      { GEBRUIKERID: 1, ROL: "KLANT", EMAILADRES: "michel@outlook.be", ISACTIEF: 1, NAAM: "Michel", WACHTWOORD: 1234 },
      {	GEBRUIKERID: 4, ROL: "LEVERANCIER", EMAILADRES: "mark@outlook.be", ISACTIEF: 1, NAAM: "Mark", WACHTWOORD: 1234 },
      {	GEBRUIKERID: 11, ROL: "LEVERANCIER", EMAILADRES: "kim@gmail.com", ISACTIEF: 1, NAAM: "Kim", WACHTWOORD: 1234 },
      {	GEBRUIKERID: 12, ROL: "KLANT", EMAILADRES: "laura@gmail.com", ISACTIEF: 1, NAAM: "Laura", WACHTWOORD: 1234 },
  ],
  //omdat de FK een PK referenced in gebruikers moeten we zeker gebruikers met id's: [ 12/11/1/4 ] hebben in table gebruiker
  bedrijven: [
    {	NAAM: "Ahold Delhaize", BTWNR: "NL463774784B52", EMAILADRES: "kim@gmail.com", ISACTIEF: 1, LOGO: "https://logodix.com/logo/420832.png", REKENINGNUMMER: "NL5253324545874212",SECTOR: "Food Retail", TELEFOONNUMMER: "+31659267802", LAND: "Netherlands", POSTCODE: "3011", STAD: "Rotterdam", STRAAT: "Wolfshoek",STRAATNR: "7", KLANT_GEBRUIKERID: 12, LEVERANCIER_GEBRUIKERID: 11 },
    {	NAAM: "Stella Artois", BTWNR: "BE197248342B38", EMAILADRES: "mark@outlook.be", ISACTIEF: 1, LOGO: "https://logodix.com/logo/2066282.png", REKENINGNUMMER: "BE16154215421625",SECTOR: "Brewers", TELEFOONNUMMER: "+32974178174", LAND: "Belgium", POSTCODE: "1000", STAD: "Brussels", STRAAT: "Kerkstraat",STRAATNR: "1", KLANT_GEBRUIKERID: 1, LEVERANCIER_GEBRUIKERID: 4 },
  ],
};

const dataToDelete = {
  gebruikers: [1, 4, 11, 12],
  bedrijven: ["Ahold Delhaize", "Stella Artois"],
};

describe("Bedrijven", () => {
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

  const leverancierurl = '/api/levcompanydetails';
  const klanturl = '/api/cstcompanydetails';
  //test get alle bedrijven (via leverancier)
  describe('GET /api/levcompanydetails', () => {

    //testdata toevoegen
    beforeAll(async () => {
      await knex(tables.gebruiker).insert(data.gebruikers);
      await knex(tables.bedrijf).insert(data.bedrijven);
    });

    //testdata verwijderen
    afterAll(async () => {
      await knex(tables.bedrijf).whereIn('NAAM', dataToDelete.bedrijven).delete();
      await knex(tables.gebruiker).whereIn('GEBRUIKERID', dataToDelete.gebruikers).delete();
    });

    //test happy flow
    it('should return 200 and all bedrijven', async() => {
      const response = await request.get(leverancierurl);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);

      expect(response.body.data[0]).toEqual({
        NAAM: "Ahold Delhaize",
        BTWNR: "NL463774784B52",
        EMAILADRES: "kim@gmail.com",
        ISACTIEF: 1,
        LOGO: "https://logodix.com/logo/420832.png",
        REKENINGNUMMER: "NL5253324545874212",
        SECTOR: "Food Retail",
        TELEFOONNUMMER: "+31659267802",
        LAND: "Netherlands",
        POSTCODE: "3011",
        STAD: "Rotterdam",
        STRAAT: "Wolfshoek",
        STRAATNR: "7",
        KLANT_GEBRUIKERID: 12,
        LEVERANCIER_GEBRUIKERID: 11 
      });
    });

    //test bad request
    it('should 400 when given an argument', async () => {
      const response = await request.get(`${leverancierurl}?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });
  });


  //test getBedrijf op Klant ID
  describe('GET /api/cstcompanydetails/:id', () => {

    //testdata toevoegen
    beforeAll(async () => {
      await knex(tables.gebruiker).insert(data.gebruikers);
      await knex(tables.bedrijf).insert(data.bedrijven);
    });

    //testdata verwijderen
    afterAll(async () => {
      await knex(tables.bedrijf).whereIn('NAAM', dataToDelete.bedrijven).delete();
      await knex(tables.gebruiker).whereIn('GEBRUIKERID', dataToDelete.gebruikers).delete();
    });

    //test
    it('should 200 and return the requested company', async () => {
      const response = await request.get(`${klanturl}/1`);
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        NAAM: "Stella Artois",
        BTWNR: "BE197248342B38",
        EMAILADRES: "mark@outlook.be",
        ISACTIEF: 1,
        LOGO: "https://logodix.com/logo/2066282.png",
        REKENINGNUMMER: "BE16154215421625",
        SECTOR: "Brewers",
        TELEFOONNUMMER: "+32974178174",
        LAND: "Belgium",
        POSTCODE: "1000",
        STAD: "Brussels",
        STRAAT: "Kerkstraat",
        STRAATNR: "1",
        KLANT_GEBRUIKERID: 1,
        LEVERANCIER_GEBRUIKERID: 4
      });
    });

    it('should 404 when requesting non existing company', async () => {
      const response = await request.get(`${klanturl}/500`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No company with id 500 exists',
        details: {
          id: 500,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 400 with invalid company id', async () => {
      const response = await request.get(`${klanturl}/invalid`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });
  });

  //test getBedrijf op Leverancier ID
  describe('GET /api/levcompanydetails/:id', () => {

    //testdata toevoegen
    beforeAll(async () => {
      await knex(tables.gebruiker).insert(data.gebruikers);
      await knex(tables.bedrijf).insert(data.bedrijven);
    });

    //testdata verwijderen
    afterAll(async () => {
      await knex(tables.bedrijf).whereIn('NAAM', dataToDelete.bedrijven).delete();
      await knex(tables.gebruiker).whereIn('GEBRUIKERID', dataToDelete.gebruikers).delete();
    });

    //test
    it('should 200 and return the requested company', async () => {
      const response = await request.get(`${leverancierurl}/4`);
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        NAAM: "Stella Artois",
        BTWNR: "BE197248342B38",
        EMAILADRES: "mark@outlook.be",
        ISACTIEF: 1,
        LOGO: "https://logodix.com/logo/2066282.png",
        REKENINGNUMMER: "BE16154215421625",
        SECTOR: "Brewers",
        TELEFOONNUMMER: "+32974178174",
        LAND: "Belgium",
        POSTCODE: "1000",
        STAD: "Brussels",
        STRAAT: "Kerkstraat",
        STRAATNR: "1",
        KLANT_GEBRUIKERID: 1,
        LEVERANCIER_GEBRUIKERID: 4
      });
    });

    it('should 404 when requesting non existing company', async () => {
      const response = await request.get(`${leverancierurl}/500`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No company with id 500 exists',
        details: {
          id: 500,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 400 with invalid company id', async () => {
      const response = await request.get(`${leverancierurl}/invalid`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

  });
});