const Router = require('@koa/router');
const installHealthRouter = require('./health');
//TODO : hier komen andere routes naar de DB-data vb gebruiker/product/bedrijf/etc


/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);
  //TODO -> meerdere route installers -> vb installUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
