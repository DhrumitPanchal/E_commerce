const Order = require("../models/OrderModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

async function getAllOrders(req, res) {
  try {
    const allOrders = await Order.find();
    if (!allOrders) {
      return res.status(404).json({ msg: "not have any orders" });
    }
    res.status(200).json({ result: allOrders });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

async function addOrder(req, res) {
  const { userID, orderData } = req.body;

  if (!userID || !orderData) {
    return res.json({ msg: "all product details is required" });
  }

  if (!mongoose.isValidObjectId(userID)) {
    return res.json({ msg: "invalid user ID " });
  }
  try {
    const checkUserExist = await User.findById(userID);
    if (!checkUserExist) {
      return res.status(404).json({ msg: "user not found please login" });
    }
    const order = await Order.create({
      userID,
      productsDetails: orderData,
    });

    res.status(201).json({ msg: "order added successfully", result: order });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

async function updateOrder(req, res) {
  const { orderID, orderData, orderStatus } = req.body;

  if (!orderID || !orderData || !orderStatus) {
    return res.json({ msg: "all details is required" });
  }

  try {
    const order = await Order.findByIdAndUpdate(orderID, {
      productsDetails: orderData,
      orderStatus,
    });

    res.status(200).json({ msg: "order updated successfully", result: order });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

async function deleteOrder(req, res) {
  const { orderID } = req.body;

  if (!orderID) {
    return res.json({ msg: "order ID is required" });
  }
  try {
    const order = await Order.findByIdAndDelete(orderID);

    res.status(200).json({ msg: "order deleted successfully", result: order });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

module.exports = {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
