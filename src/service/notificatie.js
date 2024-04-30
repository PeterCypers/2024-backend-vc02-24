const notificatieRepository = require("../repository/notificatie");
const ServiceError = require("../core/serviceError");

const getAll = async (gebruikerId, rol) => {
  const items = await notificatieRepository.getAll(gebruikerId);
  return {
    count: items.length,
    items,
  };
};

const updateAll = async (gebruikerId, rol) => {
  const count = await notificatieRepository.updateAll(gebruikerId, rol);
  return {
    count
  }
};

module.exports = {
  getAll,
  updateAll,
};
