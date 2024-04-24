const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data");

const SELECT_COLUMS = [
  `${tables.bestelling}.ORDERID`,
  `${tables.bestelling}.BETALINGSTATUS`,
  `${tables.bestelling}.BETALINGSDATUM`,
  `${tables.bestelling}.DATUMGEPLAATST`,
  `${tables.bestelling}.HERINNERINGSDATUM`,
  `${tables.bestelling}.ORDERSTATUS`,

  `${tables.bestelling}.KLANT_GEBRUIKERID`,
  `${tables.klant}.TELEFOONNUMMER as KLANT_TELEFOONNUMMER`,
  `u1.EMAILADRES as KLANT_EMAILADRES`,
  `${tables.klant}.LAND as KLANT_LAND`,
  `${tables.klant}.POSTCODE as KLANT_POSTCODE`,
  `${tables.klant}.STAD as KLANT_STAD`,
  `${tables.klant}.STRAAT as KLANT_STRAAT`,
  `${tables.klant}.STRAATNR as KLANT_STRAATNR`,
  `${tables.klant}.BEDRIJF_NAAM as KLANT_BEDRIJF_NAAM`,
  `b1.BTWNR as KLANT_BEDRIJF_BTWNR`,
  `b1.ISACTIEF as KLANT_BEDRIJF_ISACTIEF`,
  `b1.LOGO as KLANT_BEDRIJF_LOGO`,
  `b1.REKENINGNUMMER as KLANT_BEDRIJF_REKENINGNUMMER`,
  `b1.SECTOR as KLANT_BEDRIJF_SECTOR`,

  `${tables.bestelling}.LEVERANCIER_GEBRUIKERID`,
  `${tables.leverancier}.BEDRIJF_NAAM as LEVERANCIER_BEDRIJF_NAAM`,
  `u2.EMAILADRES as LEVERANCIER_EMAILADRES`,
  `b2.BTWNR as LEVERANCIER_BEDRIJF_BTWNR`,
  `b2.ISACTIEF as LEVERANCIER_BEDRIJF_ISACTIEF`,
  `b2.LOGO as LEVERANCIER_BEDRIJF_LOGO`,
  `b2.REKENINGNUMMER as LEVERANCIER_BEDRIJF_REKENINGNUMMER`,
  `b2.SECTOR as LEVERANCIER_BEDRIJF_SECTOR`,
];

const formatBestelling = ({
  KLANT_GEBRUIKERID,
  KLANT_TELEFOONNUMMER,
  KLANT_EMAILADRES,
  KLANT_LAND,
  KLANT_POSTCODE,
  KLANT_STAD,
  KLANT_STRAAT,
  KLANT_STRAATNR,
  KLANT_BEDRIJF_NAAM,
  KLANT_BEDRIJF_BTWNR,
  KLANT_BEDRIJF_ISACTIEF,
  KLANT_BEDRIJF_LOGO,
  KLANT_BEDRIJF_REKENINGNUMMER,
  KLANT_BEDRIJF_SECTOR,

  LEVERANCIER_GEBRUIKERID,
  LEVERANCIER_BEDRIJF_NAAM,
  LEVERANCIER_EMAILADRES,
  LEVERANCIER_BEDRIJF_BTWNR,
  LEVERANCIER_BEDRIJF_ISACTIEF,
  LEVERANCIER_BEDRIJF_LOGO,
  LEVERANCIER_BEDRIJF_REKENINGNUMMER,
  LEVERANCIER_BEDRIJF_SECTOR,
  ...rest
}) => ({
  ...rest,
  klant: {
    KLANT_GEBRUIKERID: KLANT_GEBRUIKERID,
    TELEFOONNUMMER: KLANT_TELEFOONNUMMER,
    KLANT_EMAILADRES: KLANT_EMAILADRES,
    LAND: KLANT_LAND,
    POSTCODE: KLANT_POSTCODE,
    STAD: KLANT_STAD,
    STRAAT: KLANT_STRAAT,
    STRAATNR: KLANT_STRAATNR,
    KLANT_BEDRIJF_NAAM: KLANT_BEDRIJF_NAAM,
    KLANT_BEDRIJF_BTWNR: KLANT_BEDRIJF_BTWNR,
    KLANT_BEDRIJF_ISACTIEF: KLANT_BEDRIJF_ISACTIEF,
    KLANT_BEDRIJF_LOGO: KLANT_BEDRIJF_LOGO,
    KLANT_BEDRIJF_REKENINGNUMMER: KLANT_BEDRIJF_REKENINGNUMMER,
    KLANT_BEDRIJF_SECTOR: KLANT_BEDRIJF_SECTOR,
  },
  leverancier: {
    LEVERANCIER_GEBRUIKERID: LEVERANCIER_GEBRUIKERID,
    LEVERANCIER_EMAILADRES: LEVERANCIER_EMAILADRES,
    LEVERANCIER_BEDRIJF_NAAM: LEVERANCIER_BEDRIJF_NAAM,
    LEVERANCIER_BEDRIJF_BTWNR: LEVERANCIER_BEDRIJF_BTWNR,
    LEVERANCIER_BEDRIJF_ISACTIEF: LEVERANCIER_BEDRIJF_ISACTIEF,
    LEVERANCIER_BEDRIJF_LOGO: LEVERANCIER_BEDRIJF_LOGO,
    LEVERANCIER_BEDRIJF_REKENINGNUMMER: LEVERANCIER_BEDRIJF_REKENINGNUMMER,
    LEVERANCIER_BEDRIJF_SECTOR: LEVERANCIER_BEDRIJF_SECTOR,
  },
});

const getAll = async (gebruikerId) => {
  const bestellingen = await getKnex()(tables.bestelling)
    .join(
      tables.klant,
      `${tables.bestelling}.KLANT_GEBRUIKERID`,
      "=",
      `${tables.klant}.GEBRUIKERID`
    )
    .join(
      { u1: tables.gebruiker },
      `${tables.klant}.GEBRUIKERID`,
      "=",
      `u1.GEBRUIKERID`
    )
    .join(
      tables.leverancier,
      `${tables.bestelling}.LEVERANCIER_GEBRUIKERID`,
      "=",
      `${tables.leverancier}.GEBRUIKERID`
    )
    .join(
      { u2: tables.gebruiker },
      `${tables.leverancier}.GEBRUIKERID`,
      "=",
      `u2.GEBRUIKERID`
    )
    .join({ b1: tables.bedrijf }, `u1.GEBRUIKERID`, "=", `b1.KLANT_GEBRUIKERID`)
    .join(
      { b2: tables.bedrijf },
      `u2.GEBRUIKERID`,
      "=",
      `b2.LEVERANCIER_GEBRUIKERID`
    )
    .where(`${tables.bestelling}.KLANT_GEBRUIKERID`, gebruikerId)
    .orWhere(`${tables.bestelling}.LEVERANCIER_GEBRUIKERID`, gebruikerId)
    .select(SELECT_COLUMS)
    .orderBy(`${tables.bestelling}.ORDERID`, "DESC");

  return bestellingen.map(formatBestelling);
};

const getById = async (id, gebruikerId) => {
  const bestelling = await getKnex()(tables.bestelling)
    .join(
      tables.klant,
      `${tables.bestelling}.KLANT_GEBRUIKERID`,
      "=",
      `${tables.klant}.GEBRUIKERID`
    )
    .join(
      { u1: tables.gebruiker },
      `${tables.klant}.GEBRUIKERID`,
      "=",
      `u1.GEBRUIKERID`
    )
    .join(
      tables.leverancier,
      `${tables.bestelling}.LEVERANCIER_GEBRUIKERID`,
      "=",
      `${tables.leverancier}.GEBRUIKERID`
    )
    .join(
      { u2: tables.gebruiker },
      `${tables.leverancier}.GEBRUIKERID`,
      "=",
      `u2.GEBRUIKERID`
    )
    .where("KLANT_GEBRUIKERID", gebruikerId)
    .andWhere("ORDERID", id)
    .orWhere("LEVERANCIER_GEBRUIKERID", gebruikerId)
    .andWhere("ORDERID", id)
    .first(SELECT_COLUMS);

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
