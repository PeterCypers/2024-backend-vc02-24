const productService = require("../service/products");
const Joi = require('joi');
const validate = require('../core/validation');
const Router = require("@koa/router");

const getAllProducts = async (ctx) => {
  const { data, count } = await productService.getAllProducts();
  ctx.body = { data, count };
};
getAllProducts.validationscheme = null;

const getProductById = async (ctx) => {
  const product = await productService.getProductById(ctx.params.id);
  ctx.body = product;
};
getProductById.validationscheme = {
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
    validate(getAllProducts.validationscheme),
    getAllProducts);
  
  router.get(
    "/:id",
    validate(getProductById.validationscheme),
    getProductById);

  app.use(router.routes()).use(router.allowedMethods());
};
