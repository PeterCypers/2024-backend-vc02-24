const befrijfService = require("../service/bedrijf");
const Joi = require('joi');
const validate = require('../core/validation');
const Router = require("@koa/router");
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');

const getAllBedrijven = async (ctx) => {
  const { data, count } = await befrijfService.getAllBedrijven();
  ctx.body = { data, count };
};
getAllBedrijven.validationscheme = null;

const getBedrijfByKlantId = async (ctx) => {
  const bedrijf = await befrijfService.getBedrijfByKlantId(ctx.params.id);
  ctx.body = bedrijf;
};
getBedrijfByKlantId.validationscheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
//TODO: authentication testen als front-end klaar is
module.exports = function installBedrijfKlantRouter(app) {
  const router = new Router({
    prefix: "/cstcompanydetails",
  });

  //gebruiker moet klant zijn
  const requireKlant = makeRequireRole(Role.KLANT);
  router.get(
    "/",
    // requireAuthentication,
    // requireKlant,
    validate(getAllBedrijven.validationscheme),
    getAllBedrijven);
  
  router.get(
    "/:id",
    // requireAuthentication,
    // requireKlant,
    validate(getBedrijfByKlantId.validationscheme),
    getBedrijfByKlantId);

  app.use(router.routes()).use(router.allowedMethods());
};