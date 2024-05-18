const { getLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const getByOrderId = (id) => {
  return getKnex()(tables.betaling)
    .where(`${tables.betaling}.ORDERID`, id)
    .first();
};

const updateById = async (id, { isAfgehandeld }) => {
  try {
    await getKnex()(tables.betaling)
      .update({
        ISAFGEHANDELD: isAfgehandeld,
      })
      .where("ORDERID", id);
    return id;
  } catch (error) {
    getLogger().error("Error is updateById", { error });
    throw error;
  }
};

module.exports = {
  getByOrderId,
  updateById,
};
