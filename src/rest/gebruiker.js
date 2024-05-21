const Router = require("@koa/router");
const Joi = require("joi");
const gebruikerService = require("../service/gebruiker");
const validate = require("../core/validation");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const checkGebruikerId = (ctx, next) => {
  const { gebruikerId, rol } = ctx.state.session;
  const { id } = ctx.params;
  // You can only get our own data unless you're an admin
  if (id != gebruikerId && rol !== Role.ADMINISTRATOR) {
    return ctx.throw(
      403,
      "You are not allowed to view this gebruiker's information",
      {
        code: "FORBIDDEN",
      }
    );
  }
  return next();
};

const login = async (ctx) => {
  const { email, wachtwoord } = ctx.request.body;
  const token = await gebruikerService.login(email, wachtwoord);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    wachtwoord: Joi.string(),
  },
};

const getAllGebruikers = async (ctx) => {
  const gebruikers = await gebruikerService.getAll();
  ctx.body = gebruikers;
};
getAllGebruikers.validationScheme = null;

const getGebruikerById = async (ctx) => {
  const gebruiker = await gebruikerService.getById(ctx.params.id);
  ctx.status = 200;
  ctx.body = gebruiker;
};
getGebruikerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const register = async (ctx) => {
  const gebruiker = await gebruikerService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = gebruiker;
};
register.validationScheme = {
  body: {
    id: Joi.number().integer().positive(),
    emailadres: Joi.string().email(),
    wachtwoord: Joi.string().max(255),
    naam: Joi.string().max(255),
    rol: Joi.string().valid("KLANT", "LEVERANCIER", "ADMINISTRATOR"),
    isActief: Joi.number().valid(0, 1),
  },
};

const updateGebruikerById = async (ctx) => {
  console.log(ctx.body);
  console.log(ctx.body);
  const gebruiker = await gebruikerService.updateById(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = 200;
  ctx.body = gebruiker;
};
updateGebruikerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    emailadres: Joi.string().email(),
    wachtwoord: Joi.string().max(255),
    naam: Joi.string().max(255),
    rol: Joi.string().valid("KLANT", "LEVERANCIER", "ADMINISTRATOR").optional(),
    isActief: Joi.number().valid(0, 1).optional(),
  },
};

const deleteGebruikerById = async (ctx) => {
  await gebruikerService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteGebruikerById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = function installGebruikerRouter(app) {
  const router = new Router({
    prefix: "/gebruikers",
  });

  // public routes
  router.post("/login", validate(login.validationScheme), login);

  // authentication routes
  router.get(
    "/:id",
    requireAuthentication,
    validate(getGebruikerById.validationScheme),
    checkGebruikerId,
    getGebruikerById
  );

  // admin routes
  const requireAdmin = makeRequireRole(Role.ADMINISTRATOR);
  router.get(
    "/",
    requireAuthentication,
    requireAdmin,
    validate(getAllGebruikers.validationScheme),
    getAllGebruikers
  );
  router.post(
    "/register",
    requireAuthentication,
    requireAdmin,
    validate(register.validationScheme),
    register
  );
  router.put(
    "/:id",
    requireAuthentication,
    //requireAdmin,
    checkGebruikerId,
    validate(updateGebruikerById.validationScheme),
    updateGebruikerById
  );
  router.delete(
    "/:id",
    requireAuthentication,
    requireAdmin,
    validate(deleteGebruikerById.validationScheme),
    deleteGebruikerById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
