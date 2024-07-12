
import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import mongoDB from "../config/mongoose.config.js";
import fileSystem from "../utils/fileSystem.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

const Product = require('../models/product.model.js');

class ProductsManager {
  async getProducts(req, res) {
    const products = await Product.find();
    res.json(products);
  }

  async getProductById(req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  }

  async createProduct(req, res) {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(204).json();
  }
}

module.exports = new ProductsManager();
