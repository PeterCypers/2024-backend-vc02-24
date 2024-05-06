const productService = require("../service/products");
const Joi = require('joi');
const validate = require('../core/validation');
const Router = require("@koa/router");

const getAllProducts = async (ctx) => {
  const { limit, offset, filter, order } = ctx.query;
  
  const result = await productService.getAllProducts(limit, offset, filter, order);
  ctx.body = result;
  console.log(ctx);
};
getAllProducts.validationScheme = {
  query: Joi.object({
    filter: Joi.string().optional(), 
    order: Joi.string().optional().valid("asc", "desc"),
    limit: Joi.number().optional().positive().integer().max(100),
    offset: Joi.number().optional().positive().integer(),
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
