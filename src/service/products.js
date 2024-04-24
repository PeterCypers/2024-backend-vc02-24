const productRepository = require("../repository/products");
const ServiceError = require('../core/serviceError');

const getAllProducts = async () => {
  const products = await productRepository.findAll();
  const totalCount = products.length;
  return {
    data: products,
    count: totalCount,
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
