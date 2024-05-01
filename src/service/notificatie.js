const notificatieRepository = require("../repository/notificatie");
const ServiceError = require("../core/serviceError");
const Role = require('../core/roles');
const handleDBError = require("./_handleDBError");

const getAll = async (gebruikerId, limit) => {
  const items = await notificatieRepository.getAll(gebruikerId, limit);
  return {
    count: items.length,
    items,
    limit,
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

const updateById = async(id, notificatie) => {
  try {
    const result = await notificatieRepository.updateById(id, notificatie);

    if (!result)
      throw new ServiceError(`Notificatie ${id} werd niet gevonden`, 404);

    return;
  } catch (error) {
    throw handleDBError(error);
  }
}

module.exports = {
  getAll,
  updateAll,
  updateById,
};
