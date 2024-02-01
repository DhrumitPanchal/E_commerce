const express = require("express");
const {
  getAllProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/Product");
const Router = express.Router();

Router.get("/", getAllProducts);
Router.post("/add", AddProduct);
Router.put("/update", UpdateProduct);
Router.delete("/delete", DeleteProduct);

module.exports = Router;
