const { tables, getKnex } = require("../data/index");

const findAll = () => {
  return getKnex()(tables.product).select("*");
};

const findById = (id) => {
  return getKnex()(tables.product).where("PRODUCTID", id).first();
};

module.exports = {
  findAll,
  findById,
};
