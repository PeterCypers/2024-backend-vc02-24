const Router = require("@koa/router");
const notificatieService = require("../service/notificatie");
const { requireAuthentication } = require("../core/auth");
const Joi = require("joi");
const validate = require("../core/validation");

const getAll = async (ctx) => {
  const { gebruikerId } = ctx.state.session;
  ctx.body = await notificatieService.getAll(gebruikerId);
};
getAll.validationScheme = null

const updateAll = async (ctx) => {
  const { gebruikerId, rol } = ctx.state.session;
  const body = await notificatieService.updateAll(gebruikerId, rol);
  ctx.body = body;
}
updateAll.validationScheme = null

const updateById = async (ctx) => {
  await notificatieService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 204;
}
updateById.validationScheme = {
  params: {
    id: Joi.string().max(255),
  },
  body: {
    gebruikerId: Joi.number().integer().positive(),
    orderId: Joi.number().integer().positive(),
    datum: Joi.date(),
    notificatieStatus: Joi.number().valid("nieuw", "ongelezen", "gelezen"),
    bericht: Joi.string().max(255),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/notificaties",
  });

  router.get("/", requireAuthentication, getAll);
  router.post("/", requireAuthentication, updateAll);
  router.put("/:id", requireAuthentication, validate(updateById.validationScheme), updateById);

  app.use(router.routes()).use(router.allowedMethods());
};
