const Router = require('@koa/router');
const Joi = require('joi');
const gebruikerService = require('../service/gebruiker');
const validate = require('../core/validation');

const getAllGebruikers = async (ctx) => {
  const gebruikers = await gebruikerService.getAll();
  ctx.body = gebruikers;
};
getAllGebruikers.validationScheme = null;

const getGebruikerById = async (ctx) => {
  const gebruiker = await gebruikerService.getById(ctx.params.id);
  ctx.status = 200;
  ctx.body = gebruiker;
};
getGebruikerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const register = async (ctx) => {
  const gebruiker = await gebruikerService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = gebruiker;
};
register.validationScheme = {
  body: {
    emailadres: Joi.string().email(),
    wachtwoord: Joi.string().max(255),
    naam: Joi.string().max(255),
    rol: Joi.string().valid('KLANT', 'LEVERANCIER', 'ADMINISTRATOR'),
    isActief: Joi.number().valid(0, 1)
  },
};

const updateGebruikerById = async (ctx) => {
  const gebruiker = await gebruikerService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 200;
  ctx.body = gebruiker;
};
updateGebruikerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    emailadres: Joi.string().email(),
    wachtwoord: Joi.string().max(255),
    naam: Joi.string().max(255),
    rol: Joi.string().valid('KLANT', 'LEVERANCIER', 'ADMINISTRATOR'),
    isActief: Joi.number().valid(0, 1)
  },
};

const deleteGebruikerById = async (ctx) => {
  await gebruikerService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteGebruikerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = function installGebruikerRouter(app) {
  const router = new Router({
    prefix: '/gebruikers',
  });

  router.get(
    '/',
    validate(getAllGebruikers.validationScheme),
    getAllGebruikers
  );
  router.get(
    '/:id',
    validate(getGebruikerById.validationScheme),
    getGebruikerById
  );
  router.post(
    '/register',
    validate(register.validationScheme),
    register,
  );
  router.put(
    '/:id',
    validate(updateGebruikerById.validationScheme),
    updateGebruikerById
  );
  router.delete(
    '/:id',
    validate(deleteGebruikerById.validationScheme),
    deleteGebruikerById
  );

  app.use(router.routes()).use(router.allowedMethods());
};