const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const getByOrderId = (id) => {
  return getKnex()(tables.betaling)
    .where(`${tables.betaling}.ORDERID`, id)
    .first();
};

const create = async ({ ORDERID }) => {
  try {
    await getKnex()(tables.betaling).insert({
      ORDERID: ORDERID,
      ISAFGEHANDELD: 0,
    });
  } catch (error) {
    getLogger().error("Error in betaling.create", { error });
    throw error;
  }
};

module.exports = {
  getByOrderId,
  create,
};
