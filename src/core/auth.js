const gebruikerService = require('../service/gebruiker');

const requireAuthentication = async (ctx, next) => {
  const { authorization } = ctx.headers;

  const { authToken, ...session } = await gebruikerService.checkAndParseSession(
    authorization,
  );

  ctx.state.session = session;
  ctx.state.authToken = authToken;

  return next();
};

const makeRequireRole = (requiredRol) => async (ctx, next) => {
  const { rol = "" } = ctx.state.session;

  gebruikerService.checkRole(requiredRol, rol);
  return next();
};

module.exports = {
  requireAuthentication,
  makeRequireRole,
};