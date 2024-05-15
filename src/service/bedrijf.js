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

const getById = async (id, gebruikerId) => {
  const bedrijf = await bedrijfRepository.getById(id, gebruikerId);
  if(!bedrijf || 
    (bedrijf.KLANT_GEBRUIKERID !== gebruikerId && 
      bedrijf.LEVERANCIER_GERBUIKERID !== gebruikerId)
    ){
        throw ServiceError.notFound(
          `Geen bedrijf met id ${id} voor klant/leverancier ${gebruikerId}`, {id, gebruikerId}
        );
      }
  return bedrijf;
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
  try{
    await bedrijfRepository.updateById(id, {
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
    });
  } catch (error){
    throw error;
  }
};

module.exports = {
  getAllBedrijven,
  getById,
  updateById,
};