const Router = require("@koa/router");
const bestellingService = require("../service/bestelling");
const { requireAuthentication } = require("../core/auth");

const getAll = async (ctx) => {
  const { gebruikerId } = Number(
    ctx.params.gebruikerId
  ); /** ctx.state.session? */
  ctx.body = await bestellingService.getAll(gebruikerId);
};

const getById = async (ctx) => {
  const { gebruikerId } = ctx.state.session;
  ctx.body = await bestellingService.getById(
    Number(ctx.params.id),
    gebruikerId
  );
};

const create = async (ctx) => {
  ctx.body = await bestellingService.create({
    ...ctx.request.body,
  });
};

const updateById = async (ctx) => {
  ctx.body = await bestellingService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const deleteById = async (ctx) => {
  await bestellingService.deleteById(Number(ctx.params.id));
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/bestellingen",
  });

  router.get("/", requireAuthentication, getAll);
  router.post("/", requireAuthentication, create);
  router.get("/:id", requireAuthentication, getById);
  router.put("/:id", requireAuthentication, updateById);
  router.delete("/:id", requireAuthentication, deleteById);

  app.use(router.routes()).use(router.allowedMethods());
};
