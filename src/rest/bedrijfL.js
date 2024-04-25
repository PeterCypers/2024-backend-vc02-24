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

const getBedrijfByLeverancierId = async (ctx) => {
  const bedrijf = await befrijfService.getBedrijfByLeverancierId(ctx.params.id);
  ctx.body = bedrijf;
};
getBedrijfByLeverancierId.validationscheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
//TODO: authentication testen als front-end klaar is
module.exports = function installBedrijfLeverancierRouter(app) {
  const router = new Router({
    prefix: "/levcompanydetails",
  });

  //gebruiker moet leverancier zijn
  const requireLeverancier = makeRequireRole(Role.LEVERANCIER);
  router.get(
    "/",
    // requireAuthentication,
    // requireLeverancier,
    validate(getAllBedrijven.validationscheme),
    getAllBedrijven);
  
  router.get(
    "/:id",
    // requireAuthentication,
    // requireLeverancier,
    validate(getBedrijfByLeverancierId.validationscheme),
    getBedrijfByLeverancierId);

  app.use(router.routes()).use(router.allowedMethods());
};