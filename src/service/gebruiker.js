const gebruikerRepository = require('../repository/gebruiker');
const ServiceError = require('../core/serviceError');
const { generateJWT, verifyJWT } = require('../core/jwt');
const handleDBError = require('./_handleDBError');
const { getLogger } = require('../core/logging');

const makeExposedGebruiker = ({ GEBRUIKERID, NAAM, EMAILADRES, ROL }) => ({
  id: GEBRUIKERID,
  naam: NAAM,
  email: EMAILADRES,
  rol: ROL,
});

const makeLoginData = async (gebruiker) => {
  const token = await generateJWT(gebruiker);
  return {
    gebruiker: makeExposedGebruiker(gebruiker),
    token,
  };
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized('You need to be signed in');
  } 

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substring(7);
  
  try {
    const { rol, gebruikerId } = await verifyJWT(authToken);

    return {
      gebruikerId,
      rol,
      authToken,
    };
  } catch (error) {
    getLogger().error(error.message, { error });
    throw new Error(error.message);
  }
};

const checkRole = (requiredRol, rol) => {
  const hasPermission = requiredRol === rol;

  if (!hasPermission) {
    throw ServiceError.forbidden(
      'You are not allowed to view this part of the application',
    );
  }
}

const login = async (email, wachtwoord) => {
  const gebruiker = await gebruikerRepository.getByEmail(email);

  if (!gebruiker) {
    // DO NOT expose we don't know the user
    throw ServiceError.unauthorized(
      'The given email and password do not match',
    );
  }

  const wachtwoordGeldig = gebruiker.WACHTWOORD === wachtwoord;

  if (!wachtwoordGeldig) {
    // DO NOT expose we know the user but an invalid password was given
    throw ServiceError.unauthorized(
      'The given email and password do not match',
    );
  }

  return await makeLoginData(gebruiker);
};

const getAll = async () => {
  const items = await gebruikerRepository.getAll();
  return {
    items: items.map(makeExposedGebruiker),
    count: items.length,
  };
};

const getById = async (id) => {
  const gebruiker = await gebruikerRepository.getById(id);

  if (!gebruiker) {
    throw ServiceError.notFound(`No gebruiker with id ${id} exists`, { id });
  }

  return makeExposedGebruiker(gebruiker);
};

const register = async ({ emailadres, wachtwoord, naam, rol, isActief }) => {
  try {
    const gebruikerId = await gebruikerRepository.create({
      emailadres,
      wachtwoord,
      naam,
      rol,
      isActief
    });
    const gebruiker = await gebruikerRepository.getById(gebruikerId);

    return await makeLoginData(gebruiker);
  } catch (error) {
    throw handleDBError(error);
  }
};

const updateById = async (id, { emailadres, wachtwoord, naam, rol, isActief }) => {
  try {
    await gebruikerRepository.updateById(id, { emailadres, wachtwoord, naam, rol, isActief });
    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await gebruikerRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`No gebruiker with id ${id} exists`, { id });
    }
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  checkAndParseSession,
  checkRole,
  login,
  getAll,
  getById,
  register,
  updateById,
  deleteById,
};