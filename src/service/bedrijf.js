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

const getById = async (gebruikerId) => {
  const bedrijf = await bedrijfRepository.getById(gebruikerId);
  if(!bedrijf){
        throw ServiceError.notFound(
          `Geen bedrijf met id ${gebruikerId} voor klant/leverancier`, { gebruikerId}
        );
      }
  return bedrijf;
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
  try{
    await bedrijfRepository.updateById(id, {
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