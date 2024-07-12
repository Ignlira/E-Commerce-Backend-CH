import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
