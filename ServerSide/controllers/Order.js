const Order = require("../models/OrderModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
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
  const { user, items, bill } = req.body;
  if (!user || !items || !bill) {
    return res.json({ msg: "all product details is required" });
  }

  if (!mongoose.isValidObjectId(user)) {
    return res.json({ msg: "invalid user ID " });
  }
  try {
    const checkUserExist = await User.findById(user);
    if (!checkUserExist) {
      return res.status(404).json({ msg: "user not found please login" });
    }

    const order = await Order.create({
      user,
      items,
      bill,
    });

    res.status(201).json({ msg: "order added successfully", result: order });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

async function updateOrder(req, res) {
  const { orderID, orderData } = req.body;

  if (!orderID) {
    return res.json({ msg: "order ID is required" });
  }

  try {
    const order = await Order.findByIdAndUpdate(orderID, orderData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: "order updated successfully", result: order });
  } catch (error) {
    if (error?.errors?.status?.name === "ValidatorError") {
      return res
        .status(500)
        .json({
          error: error?.errors?.status?.properties?.enumValues,
          msg: "ValidatorError",
        });
    }
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

// async function addOrder(req, res) {
//   const { userID, items, bill } = req.body;
//   if (!userID || !items || !bill) {
//     return res.json({ msg: "all product details is required" });
//   }

//   if (!mongoose.isValidObjectId(userID)) {
//     return res.json({ msg: "invalid user ID " });
//   }
//   try {
//     const checkUserExist = await User.findById(userID);
//     console.log("user " + checkUserExist);
//     if (!checkUserExist) {
//       return res.status(404).json({ msg: "user not found please login" });
//     }
//     const order = await Order.create({
//       userID,
//       items,
//       bill,
//     });

//     const user = await User.findByIdAndUpdate(checkUserExist._id, {
//       userOrderID: order._id,
//     });
//     console.log(" user " + user);

//     res.status(201).json({ msg: "order added successfully", result: order });
//   } catch (error) {
//     return res.status(500).json({ error, msg: "Internal server error" });
//   }
// }

// async function updateOrder(req, res) {
//   const { orderID, items, bill, status } = req.body;

//   if (!orderID || !items || !bill) {
//     return res.json({ msg: "all details is required" });
//   }

//   try {
//     const order = await Order.findByIdAndUpdate(orderID, {
//       items,
//       bill,
//       status,
//     });

//     res.status(200).json({ msg: "order updated successfully", result: order });
//   } catch (error) {
//     return res.status(500).json({ error, msg: "Internal server error" });
//   }
// }
