const { tables, getKnex } = require("../data/index");

const findAll = async (limit, offset, filter, order) => {
  const count = await getKnex()(tables.product)
    .count("*")
    .modify(function(queryBuilder) {
      if (filter) {
        queryBuilder.whereILike('NAAM', `%${filter}%`);
      }
      if (order) {
        queryBuilder.orderBy([
          { column: 'EENHEIDSPRIJS', order },
          { column: 'PRODUCTID', order: 'asc' }, // zonder extra te sorteren op id, krijgen we inconsistente paginatie in geval van offsetting met gelijke prijzen
        ]);
      }
    });
  
  const items = await getKnex()(tables.product)
    .select("*")
    .modify(function(queryBuilder) {
      if (filter) {
        queryBuilder.whereILike('NAAM', `%${filter}%`);
      }
      if (order) {
        queryBuilder.orderBy([
          { column: 'EENHEIDSPRIJS', order },
          { column: 'PRODUCTID', order: 'asc' }, // zonder extra te sorteren op id, krijgen we inconsistente paginatie in geval van offsetting met gelijke prijzen
        ]);
      }
    })
    .offset(offset ? offset : 0)
    .limit(limit ? limit : 100);

    return { count, items };
};

const findById = async (id) => {
  return await getKnex()(tables.product).where("PRODUCTID", id).first();
};

module.exports = {
  findAll,
  findById,
};
