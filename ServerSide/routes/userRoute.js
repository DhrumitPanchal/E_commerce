const express = require("express");
const router = require("express").Router();
const passport = require("passport");
const {
  getAllUsers,
  handleUserRegister,
  handleUserLogin,
  handelJwtTokenBasedLogin,
  handelAdminAccess,
  GoogleLogin,
} = require("../controllers/Auth");
const {
  getLikedProducts,
  addLikedProduct,
  removeFromLikedProduct,
  getCartProducts,
  addCartProduct,
  removeFromCartProduct,
  removeAllCartProduct,
  updateCartProduct,
} = require("../controllers/Userproducts");
const Router = express.Router();
Router.get("/", (req, res) => {
  res.send("api running fine");
});

Router.get("/auth", (req, res) => {
  res.json({ msg: "working" });
});
Router.post("/register", handleUserRegister);
Router.post("/login", handleUserLogin);
Router.get("/getallusers", getAllUsers);
Router.post("/adminlogin", handelAdminAccess);
Router.post("/jwtlogin", handelJwtTokenBasedLogin);
Router.get("/likedproducts", getLikedProducts);
Router.post("/likedproducts", addLikedProduct);
Router.delete("/likedproducts", removeFromLikedProduct);
Router.get("/cartproducts", getCartProducts);
Router.post("/cartproducts", addCartProduct);
Router.put("/cartproducts", updateCartProduct);
Router.delete("/cartproducts", removeFromCartProduct);
Router.delete("/cartproducts/all", removeAllCartProduct);

Router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

Router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

Router.post("/google", GoogleLogin);

module.exports = Router;
