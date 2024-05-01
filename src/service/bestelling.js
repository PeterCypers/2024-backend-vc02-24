const bestellingRepository = require("../repository/bestelling");
const ServiceError = require("../core/serviceError");

const getAll = async (gebruikerId) => {
  const items = await bestellingRepository.getAll(gebruikerId);
  return {
    count: items.length,
    items,
  };
};

const getById = async (id, gebruikerId) => {
  const bestelling = await bestellingRepository.getById(id, gebruikerId);
  if (
    !bestelling ||
    (bestelling.klant.KLANT_GEBRUIKERID !== gebruikerId &&
      bestelling.leverancier.LEVERANCIER_GEBRUIKERID !== gebruikerId)
  ) {
    throw ServiceError.notFound(
      `Geen bestelling met id ${id} voor klant/leverancier ${gebruikerId}`,
      { id, gebruikerId }
    );
  }
  return bestelling;
};

const create = async ({
  ORDERID,
  BETALINGSTATUS,
  BETALINGSDATUM,
  DATUMGEPLAATST,
  HERINNERINGSDATUM,
  ORDERSTATUS,
  KLANT_GEBRUIKERID,
  LEVERANCIER_GEBRUIKERID,
}) => {
  try {
    await bestellingRepository.create({
      ORDERID,
      BETALINGSTATUS,
      BETALINGSDATUM,
      DATUMGEPLAATST,
      HERINNERINGSDATUM,
      ORDERSTATUS,
      KLANT_GEBRUIKERID,
      LEVERANCIER_GEBRUIKERID,
    });
  } catch (error) {
    throw error;
  }
};

const updateById = async (
  id,
  {
    BETALINGSTATUS,
    BETALINGSDATUM,
    DATUMGEPLAATST,
    HERINNERINGSDATUM,
    ORDERSTATUS,
    KLANT_GEBRUIKERID,
    LEVERANCIER_GEBRUIKERID,
  }
) => {
  try {
    await bestellingRepository.updateById(id, {
      BETALINGSTATUS,
      BETALINGSDATUM,
      DATUMGEPLAATST,
      HERINNERINGSDATUM,
      ORDERSTATUS,
      KLANT_GEBRUIKERID,
      LEVERANCIER_GEBRUIKERID,
    });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await bestellingRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`Geen bestelling met id ${id}`, { id });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
