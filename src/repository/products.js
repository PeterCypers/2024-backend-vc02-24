const { tables, getKnex } = require("../data/index");

const findAll = (limit, offset, filter, order) => {
  return getKnex()(tables.product)
    .select("*")
    .limit(limit ? limit : 100)
    .offset(offset ? offset : 0)
    .modify(function(queryBuilder) {
      if (filter) {
        queryBuilder.whereILike('NAAM', `%${filter}%`);
      }
      if (order) {
        queryBuilder.orderBy('EENHEIDSPRIJS', order);
      }
    })
};

const findById = (id) => {
  return getKnex()(tables.product).where("PRODUCTID", id).first();
};

module.exports = {
  findAll,
  findById,
};
