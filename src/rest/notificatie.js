const Router = require("@koa/router");
const notificatieService = require("../service/notificatie");
const { requireAuthentication } = require("../core/auth");
const Joi = require("joi");

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

module.exports = (app) => {
  const router = new Router({
    prefix: "/notificaties",
  });

  router.get("/", requireAuthentication, getAll);
  router.post("/", requireAuthentication, updateAll);

  app.use(router.routes()).use(router.allowedMethods());
};
