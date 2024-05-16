const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const findAll = () => {
  return getKnex()(tables.bedrijf).select("*");
};

const getById = async (gebruikerId) => {
  return getKnex()(tables.bedrijf).where(`KLANT_GEBRUIKERID`, gebruikerId)
  .orWhere(`LEVERANCIER_GEBRUIKERID`, gebruikerId)
  .first();
}

const updateById = async (
  id,
  {
    NAAM, 
    BTWNR, 
    EMAILADRES, 
    LOGO, 
    REKENINGNUMMER, 
    SECTOR, 
    TELEFOONNUMMER, 
    LAND, 
    POSTCODE, 
    STAD, 
    STRAAT, 
    STRAATNR
  }
) => {
  try {
    await getKnex()(tables.bedrijf)
      .where("BEDRIJFID", id)
      .update({
        NAAM: NAAM, 
        BTWNR: BTWNR, 
        EMAILADRES: EMAILADRES, 
        LOGO: LOGO, 
        REKENINGNUMMER: REKENINGNUMMER, 
        SECTOR: SECTOR, 
        TELEFOONNUMMER: TELEFOONNUMMER, 
        LAND: LAND, 
        POSTCODE: POSTCODE, 
        STAD: STAD, 
        STRAAT: STRAAT, 
        STRAATNR: STRAATNR,
  })
} catch(error){
  getLogger().error("Error in bedrijf.updateById", {
    error,
  });
  throw error;
  }
};

module.exports = {
  findAll,
  getById,
  updateById,
};