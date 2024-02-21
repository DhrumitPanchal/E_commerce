const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  likedProducts: {
    type: Array,
  },
  cartProducts: {
    type: Array,
  },
  userRole: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
