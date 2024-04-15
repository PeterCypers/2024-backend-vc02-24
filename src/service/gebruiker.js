const gebruikerRepository = require('../repository/gebruiker');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBError');

const getAll = async () => {
  const items = await gebruikerRepository.getAll();
  return {
    items,
    count: items.length,
  };
};

const getById = async (id) => {
  const gebruiker = await gebruikerRepository.getById(id);

  if (!gebruiker) {
    throw ServiceError.notFound(`No gebruiker with id ${id} exists`, { id });
  }

  return gebruiker;
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
  getAll,
  getById,
  register,
  updateById,
  deleteById,
};