const Role = require('../core/roles');
const genereerUniekeId = require('../core/hashing');
const { getKnex, tables } = require('../data');

const getAll = async (gebruikerId) => {
  const notificaties = await getKnex()(tables.notificatie)
    .select()
    .where(`${tables.notificatie}.GEBRUIKERID`, gebruikerId)
    .orderBy(`${tables.notificatie}.DATUM`, "DESC");

  return notificaties;
};

const updateAll = async (gebruikerId, rol) => {
  if (rol == Role.KLANT) {
    const bestellingData = await getKnex()(tables.bestelling)
      .select()
      .where(`${tables.bestelling}.KLANT_GEBRUIKERID`, gebruikerId)
      .andWhere(`${tables.bestelling}.BETALINGSTATUS`, '=', 'FACTUUR_VERZONDEN')
      .andWhere(`${tables.bestelling}.HERINNERINGSDATUM`, '<=', new Date().toISOString())
      .orderBy(`${tables.bestelling}.ORDERID`, "DESC");

    if (bestellingData.length == 0)
      return 0;

    const notificaties = bestellingData.map(
      (data) => ({
        NOTIFICATIEID: genereerUniekeId(`${data.KLANT_GEBRUIKERID} - Betalingsverzoek voor ${data.ORDERID}`),
        GEBRUIKERID: data.KLANT_GEBRUIKERID,
        ORDERID: data.ORDERID,
        DATUM: new Date(),
        NOTIFICATIESTATUS: "nieuw",
        BERICHT: `Betalingsverzoek voor ${data.ORDERID}`,
      })
    );

    await getKnex()(tables.notificatie)
      .insert(notificaties)
      .onConflict('NOTIFICATIEID')
      .ignore();

    return notificaties.length;
  } else if (rol == Role.LEVERANCIER) {

  }
}

module.exports = {
  getAll,
  updateAll,
};