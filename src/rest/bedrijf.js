const bedrijfService = require("../service/bedrijf");
const Joi = require('joi');
const validate = require('../core/validation');
const Router = require("@koa/router");
const { requireAuthentication } = require('../core/auth');

const getAllBedrijven = async (ctx) => {
  const { data, count } = await bedrijfService.getAllBedrijven();
  ctx.body = { data, count };
};
getAllBedrijven.validationScheme = null;

const getBedrijfById = async (ctx) => {
  const { gebruikerId } = ctx.state.session;
  ctx.body = await bedrijfService.getById(
    ctx.params.id,
    gebruikerId,
  );
};
getBedrijfById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateBedrijfById = async (ctx) => {
  ctx.body = await bedrijfService.updateById(
    ctx.params.id, 
    ctx.request.body
  );
};

updateBedrijfById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    naam: Joi.string(), 
    btwNr: Joi.string(), 
    emailadres: Joi.string().email(), 
    logo: Joi.string().uri(), 
    rekeningnummer: Joi.string(), 
    sector: Joi.string(), 
    telefoonnummer: Joi.string(), 
    land: Joi.string(), 
    postcode: Joi.string(), 
    stad: Joi.string(), 
    straat: Joi.string(), 
    straatnr: Joi.number(),
  },
};

module.exports = function installBedrijfRouter(app) {
  const router = new Router({
    prefix: "/bedrijfsgegevens",  //weet niet wat hier te zetten
  });

  router.get(
    "/",
    requireAuthentication,
    validate(getAllBedrijven.validationScheme),
    getAllBedrijven);
  
  router.get(
    "/:id",
    requireAuthentication,
    validate(getBedrijfById.validationScheme),
    getBedrijfById
  );
  router.put(
    '/:id',
    requireAuthentication,
    validate(updateBedrijfById.validationScheme),
    updateBedrijfById
  );

  app.use(router.routes()).use(router.allowedMethods());
};