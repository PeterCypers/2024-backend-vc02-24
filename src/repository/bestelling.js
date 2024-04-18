const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data");

const getAll = () => {
  return getKnex()(tables.bestelling).select().orderBy("ORDERID", "DESC");
};

const getById = (id) => {
  return getKnex()(tables.bestelling).where("ORDERID", id).first();
};

const create = async ({
  orderId,
  betalingstatus,
  betalingsdatum,
  datumGeplaatst,
  herinneringsdatum,
  orderstatus,
  klant_gebruikerId,
  leverancier_gebruikerId,
}) => {
  try {
    await getKnex()(tables.bestelling).insert({
      ORDERID: orderId,
      BETALINGSTATUS: betalingstatus,
      BETALINGSDATUM: betalingsdatum,
      DATUMGEPLAATS: datumGeplaatst,
      HERINNERINGSDATUM: herinneringsdatum,
      ORDERSTATUS: orderstatus,
      KLANT_GEBRUIKERID: klant_gebruikerId,
      LEVERANCIER_GEBRUIKERID: leverancier_gebruikerId,
    });
  } catch (error) {
    getLogger().error("Error in bestelling.create", {
      error,
    });
    throw error;
  }
};

const updateById = async (
  id,
  {
    betalingstatus,
    betalingsdatum,
    datumGeplaatst,
    herinneringsdatum,
    orderstatus,
    klant_gebruikerId,
    leverancier_gebruikerId,
  }
) => {
  try {
    await getKnex()(tables.bestelling)
      .update({
        BETALINGSTATUS: betalingstatus,
        BETALINGSDATUM: betalingsdatum,
        DATUMGEPLAATS: datumGeplaatst,
        HERINNERINGSDATUM: herinneringsdatum,
        ORDERSTATUS: orderstatus,
        KLANT_GEBRUIKERID: klant_gebruikerId,
        LEVERANCIER_GEBRUIKERID: leverancier_gebruikerId,
      })
      .where("ORDERID", id);
  } catch (error) {
    getLogger().error("Error in bestelling.updateById", {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.bestelling)
      .delete()
      .where("ORDERID", id);
    return rowsAffected > 0;
  } catch (error) {
    getLogger().error("Error in bestelling.deleteById", {
      error,
    });
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
