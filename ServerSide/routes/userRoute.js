const express = require("express");
const {
  getAllUsers,
  handleUserRegister,
  handleUserLogin,
  handelJwtTokenBasedLogin,
} = require("../controllers/Auth");
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
Router.get("/", (req, res) => {
  res.send("api running fine");
});

Router.get("/auth", (req, res) => {
  res.json({ msg: "working" });
});
Router.get("/getallusers", getAllUsers);
Router.post("/register", handleUserRegister);
Router.post("/login", handleUserLogin);
Router.post("/jwtlogin", handelJwtTokenBasedLogin);
Router.get("/likedproducts", getLikedProducts);
Router.post("/likedproducts", addLikedProduct);
Router.delete("/likedproducts", removeFromLikedProduct);
Router.get("/cartproducts", getCartProducts);
Router.post("/cartproducts", addCartProduct);
Router.put("/cartproducts", updateCartProduct);
Router.delete("/cartproducts", removeFromCartProduct);

module.exports = Router;
