import mongoose from "mongoose";
import cart from "../models/cart.model.js";
import mongoDB from "../config/mongoose.config.js";
import fileSystem from "../utils/fileSystem.js";


const Cart = require('../models/cart.model.js');

class CartManager {
  async addProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products.push(productId);
    await cart.save();
  }

  async removeProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products.pull(productId);
    await cart.save();
  }
}

module.exports = CartManager;