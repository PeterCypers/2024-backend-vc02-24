const productRepository = require("../repository/products");

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
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
