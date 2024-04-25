const bedrijfRepository = require("../repository/bedrijf");
const ServiceError = require('../core/serviceError');

const getAllBedrijven = async () => {
  const bedrijven = await bedrijfRepository.findAll();
  const totalCount = bedrijven.length;
  return {
    data: bedrijven,
    count: totalCount,
  };
};

const getBedrijfByKlantId = async (id) => {
  const bedrijf = await bedrijfRepository.findByKlantId(id);
  if(!bedrijf) {
    throw ServiceError.notFound(`No company with id ${id} exists`, {id});
  }
  return bedrijf;
}

const getBedrijfByLeverancierId = async (id) => {
  const bedrijf = await bedrijfRepository.findByLeverancierId(id);
  if(!bedrijf) {
    throw ServiceError.notFound(`No company with id ${id} exists`, {id});
  }
  return bedrijf;
};

module.exports = {
  getAllBedrijven,
  getBedrijfByKlantId,
  getBedrijfByLeverancierId,
};