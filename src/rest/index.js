const Router = require("@koa/router");
const installHealthRouter = require("./health");
const installGebruikerRouter = require("./gebruiker");
const installProductRouter = require("./products");
const installBestellingRouter = require("./bestelling");
const installBedrijfKlantRouter = require("./bedrijfK");
const installBedrijfLeverancierRouter = require("./bedrijfL");
//TODO : hier komen andere routes naar de DB-data vb gebruiker/product/bedrijf/etc

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installHealthRouter(router);
  installGebruikerRouter(router);
  installProductRouter(router);
  installBestellingRouter(router);
  installBedrijfKlantRouter(router);
  installBedrijfLeverancierRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
