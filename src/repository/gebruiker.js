const { HttpError } = require('koa');
const { getLogger } = require('../core/logging');
// const { tables, getKnex } = require('../data');
const mockData = require('../data/mock-data');

//TODO: use db connection instead of mock data

const getAll = () => {
  
  return mockData;
  // return getKnex()(tables.gebruiker).select().orderBy('NAAM', 'ASC');
};

const getById = (id) => {
  
  return mockData.find(g => g.GEBRUIKERID == id)
  // return getKnex()(tables.gebruiker).where('GEBRUIKERID', id).first();
};

const create = async ({
  emailadres, wachtwoord, naam, rol, isActief
}) => {
  
  return mockData.push({
    GEBRUIKERID: mockData.length,
    EMAILADRES: emailadres,
    WACHTWOORD: wachtwoord,
    NAAM: naam,
    ROL: rol,
    ISACTIEF: isActief,
  })
  // try {
  //   const [id] = await getKnex()(tables.user).insert({
  //     rol, emailadres, isActief, naam, wachtwoord
  //   });
  //   return id;
  // } catch (error) {
  //   getLogger().error('Error in create', {
  //     error,
  //   });
  //   throw error;
  // }
};

const updateById = async (id, { emailadres, wachtwoord, naam, rol, isActief }) => {
  
  const gebruikerIndex = mockData.findIndex(g => g.GEBRUIKERID == id)

  if (gebruikerIndex == -1)
    return;

  mockData[gebruikerIndex] = {
    GEBRUIKERID: id,
    EMAILADRES: emailadres,
    WACHTWOORD: wachtwoord,
    NAAM: naam,
    ROL: rol,
    ISACTIEF: isActief,
  }

  
  // try {
  //   await getKnex()(tables.gebruiker)
  //     .update({
  //       rol, emailadres, isActief, naam, wachtwoord
  //     })
  //     .where('GEBRUIKERID', id);
  //   return id;
  // } catch (error) {
  //   getLogger().error('Error in updateById', {
  //     error,
  //   });
  //   throw error;
  // }
};

const deleteById = async (id) => {
  
  const gebruikerIndex = mockData.findIndex(g => g.GEBRUIKERID == id)

  if (gebruikerIndex == -1)
    return false;

  return mockData.splice(gebruikerIndex, 1)[0];

  // try {
  //   const rowsAffected = await getKnex()(tables.gebruiker).delete().where('GEBRUIKERID', id);
  //   return rowsAffected > 0;
  // } catch (error) {
  //   getLogger().error('Error in deleteById', {
  //     error,
  //   });
  //   throw error;
  // }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};