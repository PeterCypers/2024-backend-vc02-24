const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data");
const Role = require('../core/roles');

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

  `${tables.product}.NAAM as PRODUCT_NAAM`,
  `${tables.product}.EENHEIDSPRIJS as PRODUCT_EENHEIDSPRIJS`,
  `${tables.product}.STOCK as PRODUCT_STOCK`,
  `${tables.besteldProduct}.AANTAL as PRODUCT_AANTAL`,
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

  PRODUCTEN,

  ...rest
}) => ({
  ...rest,
  klant: {
    KLANT_GEBRUIKERID,
    TELEFOONNUMMER: KLANT_TELEFOONNUMMER,
    KLANT_EMAILADRES,
    LAND: KLANT_LAND,
    POSTCODE: KLANT_POSTCODE,
    STAD: KLANT_STAD,
    STRAAT: KLANT_STRAAT,
    STRAATNR: KLANT_STRAATNR,
    KLANT_BEDRIJF_NAAM,
    KLANT_BEDRIJF_BTWNR,
    KLANT_BEDRIJF_ISACTIEF,
    KLANT_BEDRIJF_LOGO,
    KLANT_BEDRIJF_REKENINGNUMMER,
    KLANT_BEDRIJF_SECTOR,
  },
  leverancier: {
    LEVERANCIER_GEBRUIKERID,
    LEVERANCIER_EMAILADRES,
    LEVERANCIER_BEDRIJF_NAAM,
    LEVERANCIER_BEDRIJF_BTWNR,
    LEVERANCIER_BEDRIJF_ISACTIEF,
    LEVERANCIER_BEDRIJF_LOGO,
    LEVERANCIER_BEDRIJF_REKENINGNUMMER,
    LEVERANCIER_BEDRIJF_SECTOR,
  },
  producten: PRODUCTEN.map((product) => ({
    PRODUCT_NAAM: product.PRODUCT_NAAM,
    PRODUCT_EENHEIDSPRIJS: product.PRODUCT_EENHEIDSPRIJS,
    PRODUCT_STOCK: product.PRODUCT_STOCK,
    PRODUCT_AANTAL: product.PRODUCT_AANTAL,
  })),
});

const getAll = async (gebruikerId, rol, limit, offset, filter, order, orderField) => {
  const bestellingenRows = await getKnex()(tables.bestelling)
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
    .join(
      tables.bestelling_besteldProduct,
      `${tables.bestelling}.ORDERID`,
      "=",
      `${tables.bestelling_besteldProduct}.Bestelling_ORDERID`
    )
    .join(
      tables.besteldProduct,
      `${tables.bestelling_besteldProduct}.producten_BESTELDPRODUCTID`,
      "=",
      `${tables.besteldProduct}.BESTELDPRODUCTID`
    )
    .join(
      tables.product,
      `${tables.besteldProduct}.PRODUCT_PRODUCTID`,
      "=",
      `${tables.product}.PRODUCTID`
    )
    .select(SELECT_COLUMS)
    .where((queryBuilder) => {
      queryBuilder.where(`${tables.bestelling}.KLANT_GEBRUIKERID`, gebruikerId)
        .orWhere(`${tables.bestelling}.LEVERANCIER_GEBRUIKERID`, gebruikerId);
    })
    .andWhere((queryBuilder) => {
      if (!filter)
        return true;

      queryBuilder.whereILike(`${tables.bestelling}.DATUMGEPLAATST`, `%${filter}%`)
        .orWhereILike(`${rol == Role.LEVERANCIER ? tables.klant : tables.leverancier}.BEDRIJF_NAAM`, `%${filter}%`)
        .orWhereILike(`${tables.bestelling}.ORDERID`, `%${filter}%`)
        .orWhereILike(`${tables.bestelling}.ORDERSTATUS`, `%${filter}%`)
        .orWhereILike(`${tables.bestelling}.BETALINGSTATUS`, `%${filter}%`);
    })
    .modify(function(queryBuilder) {
      if (!order) {
        orderField = `ORDERID`;
        order = `desc`;
      }

      let orderTable;
      if (orderField === "BEDRIJF_NAAM") {
        orderTable = rol == Role.LEVERANCIER ? tables.klant : tables.leverancier;
      } else {
        orderTable = tables.bestelling;
      }

      queryBuilder.orderBy(`${orderTable}.${orderField}`, order);
    });

  const bestellingenMap = bestellingenRows.reduce((map, row) => {
    const orderId = row.ORDERID;
    if (!map.has(orderId)) {
      map.set(orderId, {
        ...row,
        PRODUCTEN: [],
      });
    }
    map.get(orderId).PRODUCTEN.push({
      PRODUCT_NAAM: row.PRODUCT_NAAM,
      PRODUCT_EENHEIDSPRIJS: row.PRODUCT_EENHEIDSPRIJS,
      PRODUCT_STOCK: row.PRODUCT_STOCK,
      PRODUCT_AANTAL: row.PRODUCT_AANTAL,
    });
    return map;
  }, new Map());

  const bestellingen = Array.from(bestellingenMap.values()).slice(offset || 0, limit || 100).map(
    formatBestelling
  );

  return bestellingen;
};

const getById = async (id, gebruikerId) => {
  const bestellingenRows = await getKnex()(tables.bestelling)
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
    .join(
      tables.bestelling_besteldProduct,
      `${tables.bestelling}.ORDERID`,
      "=",
      `${tables.bestelling_besteldProduct}.Bestelling_ORDERID`
    )
    .join(
      tables.besteldProduct,
      `${tables.bestelling_besteldProduct}.producten_BESTELDPRODUCTID`,
      "=",
      `${tables.besteldProduct}.BESTELDPRODUCTID`
    )
    .join(
      tables.product,
      `${tables.besteldProduct}.PRODUCT_PRODUCTID`,
      "=",
      `${tables.product}.PRODUCTID`
    )
    .where(`${tables.bestelling}.KLANT_GEBRUIKERID`, gebruikerId)
    .orWhere(`${tables.bestelling}.LEVERANCIER_GEBRUIKERID`, gebruikerId)
    .having(`${tables.bestelling}.ORDERID`, "=", id)
    .select(SELECT_COLUMS)
    .orderBy(`${tables.bestelling}.ORDERID`, "DESC");

  const bestelling = bestellingenRows.reduce((acc, row) => {
    if (!acc) {
      acc = {
        ...row,
        PRODUCTEN: [],
      };
    }
    acc.PRODUCTEN.push({
      PRODUCT_NAAM: row.PRODUCT_NAAM,
      PRODUCT_EENHEIDSPRIJS: row.PRODUCT_EENHEIDSPRIJS,
      PRODUCT_STOCK: row.PRODUCT_STOCK,
      PRODUCT_AANTAL: row.PRODUCT_AANTAL,
    });
    return acc;
  }, null);

  return formatBestelling(bestelling);
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