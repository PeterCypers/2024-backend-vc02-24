const Router = require("@koa/router");
const Joi = require("joi");
const betalingService = require("../service/betaling");
const validate = require("../core/validation");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const getByOrderId = async (ctx) => {
  const betaling = await betalingService.getByOrderId(ctx.params.id);
  ctx.status = 200;
  ctx.body = betaling;
};
getByOrderId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateById = async (ctx) => {
  ctx.body = await betalingService.updateById(ctx.params.id);
};

const create = async (ctx) => {
  ctx.body = await betalingService.create({ ...ctx.request.body });
  console.log(ctx.request.body);
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/betaling",
  });

  router.get(
    "/:id",
    requireAuthentication,
    validate(getByOrderId.validationScheme),
    getByOrderId
  );
  router.put("/:id", requireAuthentication, updateById);
  router.post("/", requireAuthentication, create);

  app.use(router.routes()).use(router.allowedMethods());
};
