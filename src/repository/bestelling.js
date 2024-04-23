const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data");

const getAll = async (gebruikerId) => {
  const bestellingen = getKnex()(tables.bestelling)
    .select()
    .where("KLANT_GEBRUIKERID", gebruikerId)
    .orWhere("LEVERANCIER_GEBRUIKERID", gebruikerId)
    .orderBy("ORDERID", "DESC");

  return bestellingen;
};

const getById = (id, gebruikerId) => {
  const bestelling = getKnex()(tables.bestelling)
    .where("KLANT_GEBRUIKERID", gebruikerId)
    .andWhere("ORDERID", id)
    .orWhere("LEVERANCIER_GEBRUIKERID", gebruikerId)
    .andWhere("ORDERID", id)
    .first();
  // const bestelling = getKnex()(tables.bestelling)
  //   .where("ORDERID", id)
  //   .andWhere(function () {
  //     this.where("KLANT_GEBRUIKERID", gebruikerId).orWhere(
  //       "LEVERANCIER_GEBRUIKERID",
  //       gebruikerId
  //     );
  //   })
  //   .first();

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
    await getKnex()(tables.bestelling).insert({
      ORDERID: ORDERID,
      BETALINGSTATUS: BETALINGSTATUS,
      BETALINGSDATUM: BETALINGSDATUM,
      DATUMGEPLAATST: DATUMGEPLAATST,
      HERINNERINGSDATUM: HERINNERINGSDATUM,
      ORDERSTATUS: ORDERSTATUS,
      KLANT_GEBRUIKERID: KLANT_GEBRUIKERID,
      LEVERANCIER_GEBRUIKERID: LEVERANCIER_GEBRUIKERID,
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
    await getKnex()(tables.bestelling)
      .update({
        BETALINGSTATUS: BETALINGSTATUS,
        BETALINGSDATUM: BETALINGSDATUM,
        DATUMGEPLAATST: DATUMGEPLAATST,
        HERINNERINGSDATUM: HERINNERINGSDATUM,
        ORDERSTATUS: ORDERSTATUS,
        KLANT_GEBRUIKERID: KLANT_GEBRUIKERID,
        LEVERANCIER_GEBRUIKERID: LEVERANCIER_GEBRUIKERID,
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
