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
    naam, 
    btwNr, 
    emailadres, 
    logo, 
    rekeningnummer, 
    sector, 
    telefoonnummer, 
    land, 
    postcode, 
    stad, 
    straat, 
    straatnr
  }
) => {
  try {
    await getKnex()(tables.bedrijf)
      .where("KLANT_GEBRUIKERID", id)
      .orWhere("LEVERANCIER_GEBRUIKERID", id)
      .update({
        NAAM: naam, 
        BTWNR: btwNr, 
        EMAILADRES: emailadres, 
        LOGO: logo, 
        REKENINGNUMMER: rekeningnummer, 
        SECTOR: sector, 
        TELEFOONNUMMER: telefoonnummer, 
        LAND: land, 
        POSTCODE: postcode, 
        STAD: stad, 
        STRAAT: straat, 
        STRAATNR: straatnr,
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