const betalingRepository = require("../repository/betaling");
const ServiceError = require("../core/serviceError");
const handleDBError = require("./_handleDBError");

const getByOrderId = async (id) => {
  const betaling = betalingRepository.getByOrderId(id);

  if (!betaling)
    throw ServiceError.notFound(`No betaling with orderid ${id}`, { id });

  return betaling;
};

const updateById = async (id) => {
  try {
    await betalingRepository.updateById(id);
    return getByOrderId(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  getByOrderId,
  updateById,
};
