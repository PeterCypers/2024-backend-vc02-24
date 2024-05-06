const productService = require("../service/products");
const Joi = require('joi');
const validate = require('../core/validation');
const Router = require("@koa/router");

const getAllProducts = async (ctx) => {
  const { limit, offset, filter, order } = ctx.query;
  const result = await productService.getAllProducts(limit, offset, filter, order);
  ctx.body = result;
};
getAllProducts.validationScheme = {
  query: Joi.object({
    filter: Joi.string().optional(), 
    order: Joi.string().valid("asc", "desc").optional(),
    limit: Joi.number().integer().positive().max(100).optional(),
    offset: Joi.number().integer().min(0).optional(),
  }).and('limit', 'offset'),
};

const getProductById = async (ctx) => {
  const product = await productService.getProductById(ctx.params.id);
  ctx.body = product;
};
getProductById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = function installProductRouter(app) {
  const router = new Router({
    prefix: "/products",
  });

  router.get(
    "/",
    validate(getAllProducts.validationScheme),
    getAllProducts
  );
  
  router.get(
    "/:id",
    validate(getProductById.validationScheme),
    getProductById);

  app.use(router.routes()).use(router.allowedMethods());
};
