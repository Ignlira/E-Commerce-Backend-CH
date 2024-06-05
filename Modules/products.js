const fs = require('fs-extra');
const path = require('path');

const productsFilePath = path.join(__dirname, 'data', 'products.json');

const getProducts = async () => {
  const productsData = await fs.readJson(productsFilePath);
  return productsData;
};

const saveProducts = async (productsData) => {
  await fs.writeJson(productsFilePath, productsData);
};

module.exports = {
  getProducts,
  saveProducts,
};
