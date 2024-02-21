const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  productsDetails: {
    type: Array,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "padding",
  },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
