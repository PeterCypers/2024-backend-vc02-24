const notificatieRepository = require("../repository/notificatie");
const ServiceError = require("../core/serviceError");
const Role = require('../core/roles');

const getAll = async (gebruikerId) => {
  const items = await notificatieRepository.getAll(gebruikerId);
  return {
    count: items.length,
    items,
  };
};

const updateAll = async (gebruikerId, rol) => {
  if (rol != Role.KLANT && rol != Role.LEVERANCIER) {
    throw new ServiceError("Gebruiker is geen klant of leverancier", 400);
  }

  let count;
  if (rol == Role.KLANT)
    count = await notificatieRepository.updateAllKlant(gebruikerId);
  else
    count = await notificatieRepository.updateAllLeverancier(gebruikerId);
  
  return {
    count
  }
};

module.exports = {
  getAll,
  updateAll,
};
