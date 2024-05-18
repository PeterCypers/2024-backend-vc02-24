const genereerUniekeId = require('../core/hashing');
const { getLogger } = require('../core/logging');
const { getKnex, tables } = require('../data');

const getAll = async (gebruikerId, limit) => {
  const notificaties = await getKnex()(tables.notificatie)
    .select()
    .where(`${tables.notificatie}.GEBRUIKERID`, gebruikerId)
    .orderBy(`${tables.notificatie}.DATUM`, "DESC")
    .limit(limit ? limit : 1000);

  return notificaties;
};

const updateAllKlant = async (gebruikerId) => {
  // Betalingsverzoek notificaties
  const bestellingData = await getKnex()(tables.bestelling)
    .select()
    .where(`${tables.bestelling}.KLANT_GEBRUIKERID`, gebruikerId)
    .andWhere(`${tables.bestelling}.BETALINGSTATUS`, '=', 'FACTUUR_VERZONDEN')
    .andWhere(`${tables.bestelling}.HERINNERINGSDATUM`, '<=', new Date().toISOString());

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
}

const updateAllLeverancier = async (gebruikerId) => {
  // Betaalde bestelling notificaties
  const betaaldeBestellingData = await getKnex()(tables.bestelling)
    .select()
    .where(`${tables.bestelling}.LEVERANCIER_GEBRUIKERID`, gebruikerId)
    .andWhere(`${tables.bestelling}.BETALINGSTATUS`, '=', 'BETAALD')
    .orderBy(`${tables.bestelling}.ORDERID`, 'DESC');

  const notificaties = [];

  notificaties.push(...betaaldeBestellingData.map(
    (data) => ({
      NOTIFICATIEID: genereerUniekeId(`${gebruikerId} - ${data.ORDERID} is betaald`),
      GEBRUIKERID: gebruikerId,
      ORDERID: data.ORDERID,
      DATUM: new Date(),
      NOTIFICATIESTATUS: "nieuw",
      BERICHT: `${data.ORDERID} is betaald`,
    })
  ));
  
  // Producten in stock notificaties
  const productenInStockData = await getKnex()(tables.bestelling)
    .select(`${tables.bestelling}.ORDERID`)
    .join(
        tables.bestelling_besteldProduct,
        `${tables.bestelling}.ORDERID`,
        "=",
        `${tables.bestelling_besteldProduct}.Bestelling_ORDERID`
    )
    .join(
        tables.besteldProduct,
        `${tables.bestelling_besteldProduct}.producten_BESTELDPRODUCTID`,
        "=",
        `${tables.besteldProduct}.BESTELDPRODUCTID`
    )
    .join(
        tables.product,
        `${tables.besteldProduct}.PRODUCT_PRODUCTID`,
        "=",
        `${tables.product}.PRODUCTID`
    )
    .where(`${tables.bestelling}.LEVERANCIER_GEBRUIKERID`, gebruikerId)
    .andWhere(`${tables.bestelling}.ORDERSTATUS`, '=', 'VERWERKT')
    .andWhere(`${tables.product}.LEVERMETHODE`, '=', 'STOCK')
    .andWhere(getKnex().raw(`
        NOT EXISTS (
            SELECT 1
            FROM ${tables.bestelling_besteldProduct} AS bbp
            JOIN ${tables.besteldProduct} AS bp ON bbp.producten_BESTELDPRODUCTID = bp.BESTELDPRODUCTID
            JOIN ${tables.product} AS p ON bp.PRODUCT_PRODUCTID = p.PRODUCTID
            WHERE ${tables.bestelling}.ORDERID = bbp.Bestelling_ORDERID
            AND p.STOCK <= bp.AANTAL
        )
    `))
    .groupBy(`${tables.bestelling}.ORDERID`);
    
  notificaties.push(...productenInStockData.map(
    (data) => ({
      NOTIFICATIEID: genereerUniekeId(`${gebruikerId} - Producten in stock voor ${data.ORDERID}`),
      GEBRUIKERID: gebruikerId,
      ORDERID: data.ORDERID,
      DATUM: new Date(),
      NOTIFICATIESTATUS: "nieuw",
      BERICHT: `Producten in stock voor ${data.ORDERID}`,
    })
  ));

  if (notificaties.length == 0)
    return 0;
  
  await getKnex()(tables.notificatie)
    .insert(notificaties)
    .onConflict('NOTIFICATIEID')
    .ignore();
  
  return notificaties.length;
}

const updateById = async (id, { gebruikerId, orderId, datum, notificatieStatus, bericht }) => {
  try {
    const result = await getKnex()(tables.notificatie)
      .update({
        GEBRUIKERID: gebruikerId,
        ORDERID: orderId,
        DATUM: datum,
        NOTIFICATIESTATUS: notificatieStatus,
        BERICHT: bericht,
      })
      .where('NOTIFICATIEID', id);
      
    return result;
  } catch (error) {
    getLogger().error('Error in updateById', {
      error,
    });
    throw error;
  }
}

const maakAllOngelezen = async (id) => {
  try {
    await getKnex()(tables.notificatie)
      .where({
        NOTIFICATIESTATUS: 'nieuw',
        GEBRUIKERID: id
      })
      .update({
        NOTIFICATIESTATUS: 'ongelezen'
      });
  } catch (error) {
    getLogger().error(`Error bij het zetten van ongelezen notificaties voor gebruikerId ${id}:`, {
      error,
    });
    throw error;
  }
}

module.exports = {
  getAll,
  updateAllKlant,
  updateAllLeverancier,
  updateById,
  maakAllOngelezen,
};