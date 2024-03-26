const mongoose = require("mongoose");
const date = new Date();
const currentDate =
  date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  items: [
    {
      ProductID: {
        type: String,
      },
      Quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
      },
      Prize: Number,
    },
  ],
  bill: {
    totalItems: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  date_added: {
    type: String,
    default: currentDate,
  },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
