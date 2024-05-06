const Router = require("@koa/router");
const Joi = require('joi');
const validate = require('../core/validation');
const bestellingService = require("../service/bestelling");
const { requireAuthentication } = require("../core/auth");

const getAll = async (ctx) => {
  const { gebruikerId } = ctx.state.session;
  const { limit, offset, filter, order, orderField } = ctx.query;
  ctx.body = await bestellingService.getAll(gebruikerId, limit, offset, filter, order, orderField );
};
getAll.validationScheme = {
  query: Joi.object({
    filter: Joi.string().optional(), 
    order: Joi.string().valid("asc", "desc").optional(),
    orderField: Joi.string().optional().valid("DATUMGEPLAATST","BEDRIJF_NAAM","ORDERID","ORDERSTATUS","BETALINGSTATUS"),
    limit: Joi.number().integer().positive().max(100).optional(),
    offset: Joi.number().integer().min(0).optional(),
  }).and('limit', 'offset').and('order', 'orderField'),
};

const getById = async (ctx) => {
  const { gebruikerId } = ctx.state.session;
  ctx.body = await bestellingService.getById(
    ctx.params.id,
    gebruikerId
  );
};
getById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const create = async (ctx) => {
  ctx.body = await bestellingService.create({ ...ctx.request.body });
  console.log(ctx.request.body);
};

const updateById = async (ctx) => {
  ctx.body = await bestellingService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};

const deleteById = async (ctx) => {
  await bestellingService.deleteById(ctx.params.id);
};
deleteById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/bestellingen",
  });

  router.get("/", requireAuthentication, validate(getAll.validationScheme), getAll);
  router.post("/", requireAuthentication, create);
  router.get("/:id", requireAuthentication, validate(getById.validationScheme), getById);
  router.put("/:id", requireAuthentication, updateById);
  router.delete("/:id", requireAuthentication, validate(deleteById.validationScheme), deleteById);

  app.use(router.routes()).use(router.allowedMethods());
};
