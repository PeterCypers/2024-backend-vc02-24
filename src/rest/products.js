const productService = require("../service/products");
const Router = require("@koa/router");

const getAllProducts = async (ctx) => {
  const { data, count } = await productService.getAllProducts();
  ctx.body = { data, count };
};

const getProductById = async (ctx) => {
  const product = await productService.getProductById(ctx.params.id);
  ctx.body = product;
};

module.exports = function installProductRouter(app) {
  const router = new Router({
    prefix: "/products",
  });

  router.get("/", getAllProducts);
  router.get("/:id", getProductById);

  app.use(router.routes()).use(router.allowedMethods());
};
