const fs = require('fs-extra');
const path = require('path');
const { createCart } = require('./models/cart');



const cartsFilePath = path.join(__dirname, 'data', 'carts.json');


const getCarts = async () => {
  const cartsData = await fs.readJson(cartsFilePath);
  return cartsData;
};

const saveCarts = async (cartsData) => {
  await fs.writeJson(cartsFilePath, cartsData);
};

module.exports = {
  getCarts,
  saveCarts,
  createCart,
};
