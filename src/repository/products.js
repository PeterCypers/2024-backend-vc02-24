const { tables, getKnex } = require("../data/index");

const findAll = (limit, offset, filter, order) => {
  return getKnex()(tables.product)
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
};

const findById = (id) => {
  return getKnex()(tables.product).where("PRODUCTID", id).first();
};

module.exports = {
  findAll,
  findById,
};
