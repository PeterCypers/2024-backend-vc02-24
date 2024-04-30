const { tables, getKnex } = require("../data/index");

const findAll = () => {
  return getKnex()(tables.bedrijf).select("*");
};

const findByKlantId = (id) => {
  return getKnex()(tables.bedrijf).where("KLANT_GEBRUIKERID", id).first();
};

const findByLeverancierId = (id) => {
  return getKnex()(tables.bedrijf).where("LEVERANCIER_GEBRUIKERID", id).first();
};

module.exports = {
  findAll,
  findByKlantId,
  findByLeverancierId,
};