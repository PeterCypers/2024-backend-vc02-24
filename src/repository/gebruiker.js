const { getLogger } = require('../core/logging');
const { tables, getKnex } = require('../data');

const getAll = () => {
  return getKnex()(tables.gebruiker).select().orderBy('NAAM', 'ASC');
};

const getById = (id) => {
  return getKnex()(tables.gebruiker).where('GEBRUIKERID', id).first();
};

const getByEmail = (email) => {
  return getKnex()(tables.gebruiker).where('EMAILADRES', email).first();
};

const create = async ({
  id, emailadres, wachtwoord, naam, rol, isActief
}) => {
  try {
    await getKnex()(tables.gebruiker).insert({
      GEBRUIKERID: id,
      EMAILADRES: emailadres,
      WACHTWOORD: wachtwoord,
      NAAM: naam,
      ROL: rol,
      ISACTIEF: isActief,
    });
    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { emailadres, wachtwoord, naam, rol, isActief }) => {
  try {
    await getKnex()(tables.gebruiker)
      .update({
        EMAILADRES: emailadres,
        WACHTWOORD: wachtwoord,
        NAAM: naam,
        ROL: rol,
        ISACTIEF: isActief,
      })
      .where('GEBRUIKERID', id);
    return id;
  } catch (error) {
    getLogger().error('Error in updateById', {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.gebruiker).delete().where('GEBRUIKERID', id);
    return rowsAffected > 0;
  } catch (error) {
    getLogger().error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  updateById,
  deleteById,
};