const Order = require("../models/OrderModel");
const express = require("express");
const {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/Order");
const Router = express.Router();

Router.get("/", getAllOrders);
Router.post("/", addOrder);
Router.put("/", updateOrder);
Router.delete("/", deleteOrder);

module.exports = Router;
