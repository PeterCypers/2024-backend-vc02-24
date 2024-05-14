const productRepository = require("../repository/products");
const ServiceError = require('../core/serviceError');

const getAllProducts = async (limit, offset, filter, order) => {
  const { items, count } = await productRepository.findAll(limit, offset, filter, order);

  return {
    total: count[0]["count(*)"],
    items,
    count: items.length,
    limit,
    offset,
    filter,
    order,
  };
};

const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if(!product) {
    throw ServiceError.notFound(`No product with id ${id} exists`, {id});
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
