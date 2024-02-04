const express = require("express");
const { handleUserRegister: handleUserRegister, handleUserLogin: handleUserLogin } = require("../controllers/Auth");
const {
  getLikedProducts,
  addLikedProduct,
  removeFromLikedProduct,
  getCartProducts,
  addCartProduct,
  removeFromCartProduct,
  updateCartProduct,
} = require("../controllers/Userproducts");
const Router = express.Router();

Router.get("/auth", (req, res) => {
  res.json({ msg: "working" });
});
Router.post("/register", handleUserRegister);
Router.post("/login", handleUserLogin);
Router.get("/likedproducts", getLikedProducts);
Router.post("/likedproducts", addLikedProduct);
Router.delete("/likedproducts", removeFromLikedProduct);
Router.get("/cartproducts", getCartProducts);
Router.post("/cartproducts", addCartProduct);
Router.put("/cartproducts", updateCartProduct);
Router.delete("/cartproducts", removeFromCartProduct);

module.exports = Router;
