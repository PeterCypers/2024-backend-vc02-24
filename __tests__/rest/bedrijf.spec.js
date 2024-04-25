const supertest = require('supertest');
const createServer = require('../../src/createServer');
const { tables, getKnex } = require('../../src/data');

const data = {
  gebruikers: [
      { gebruikerid: 1, rol: "KLANT", emailadres: "michel@outlook.be", isactief: 1, naam: "Michel", wachtwoord: 1234 },
      {	gebruikerid: 4, rol: "LEVERANCIER", emailadres: "mark@outlook.be", isactief: 1, naam: "Mark", wachtwoord: 1234 },
      {	gebruikerid: 11, rol: "LEVERANCIER", emailadres: "kim@gmail.com", isactief: 1, naam: "Kim", wachtwoord: 1234 },
      {	gebruikerid: 12, rol: "KLANT", emailadres: "laura@gmail.com", isactief: 1, naam: "Laura", wachtwoord: 1234 },
  ],
  //omdat de FK een PK referenced in gebruikers moeten we zeker gebruikers met id's: [ 12/11/1/4 ] hebben 
  bedrijven: [
    {	naam: "Ahold Delhaize", btwnr: "NL463774784B52", emailadres: "kim@gmail.com", isactief: 1, logo: "https://logodix.com/logo/420832.png", rekeningnummer: "NL5253324545874212",sector: "Food Retail", telefoonnummer: "+31659267802", land: "Netherlands", postcode: "3011", stad: "Rotterdam", straat: "Wolfshoek",straatnr: 7, klant_gebruikerid: 12, leverancier_gebruikerid: 11 },
    {	naam: "Stella Artois", btwnr: "BE197248342B38", emailadres: "mark@outlook.be", isactief: 1, logo: "https://logodix.com/logo/2066282.png", rekeningnummer: "BE16154215421625",sector: "Brewers", telefoonnummer: "+32974178174", land: "Belgium", postcode: "1000", stad: "Brussels", straat: "Kerkstraat",straatnr: 1, klant_gebruikerid: 1, leverancier_gebruikerid: 4 },
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

  //test get alle bedrijven (via leverancier)
  const url = '/api/levcompanydetails';
  describe('GET /api/levcompanydetails', () => {

    //testdata toevoegen
    beforeAll(async () => {
      await knex(tables.gebruiker).insert(data.gebruikers);
      await knex(tables.bedrijf).insert(data.bedrijven);
    });

    //testdata verwijderen
    afterAll(async () => {
      await knex(tables.bedrijf).whereIn('naam', dataToDelete.bedrijven).delete();
      await knex(tables.gebruiker).whereIn('gebruikerid', dataToDelete.gebruikers).delete();
    });

    //test happy flow
    it('should return 200 and all bedrijven', async() => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
    //TODO: verdere testing
  });
});