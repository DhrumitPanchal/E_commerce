const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  discount_rate: {
    type: Number,
  },
  product_brand: {
    type: String,
    required: true,
  },
  product_rating: {
    type: Number,
    required: true,
  },
  Image_url: {
    type: String,
    required: true,
  },
  product_stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
