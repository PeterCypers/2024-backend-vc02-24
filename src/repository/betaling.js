const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const getByOrderId = (id) => {
  return getKnex()(tables.betaling)
    .where(`${tables.betaling}.ORDERID`, id)
    .first();
};

const updateById = async (id) => {
  try {
    await getKnex()(tables.betaling)
      .update({
        ISAFGEHANDELD: 1,
      })
      .where("ORDERID", id);
    return id;
  } catch (error) {
    getLogger().error("Error is updateById", { error });
    throw error;
  }
};

const create = async ({ ORDERID }) => {
  try {
    await getKnex()(tables.betaling)
      .insert({
        ORDERID: ORDERID,
        ISAFGEHANDELD: 0,
      })
      .onConflict("ORDERID")
      .merge({
        ISAFGEHANDELD: 0,
      });
  } catch (error) {
    getLogger().error("Error in betaling.create", { error });
    throw error;
  }
};

module.exports = {
  getByOrderId,
  updateById,
  create,
};
