import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  total: Number
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;