const express = require("express");
const { hendleUserRegister, hendleUserLogin } = require("../controllers/Auth");
const {
  getLikedProducts,
  addLikedProduct,
  removeFromLikedProduct,
} = require("../controllers/Userproducts");
const Router = express.Router();

Router.get("/auth", (req, res) => {
  res.json({ msg: "working" });
});
Router.post("/register", hendleUserRegister);
Router.post("/login", hendleUserLogin);
Router.get("/likedproducts", getLikedProducts);
Router.post("/likedproducts", addLikedProduct);
Router.delete("/likedproducts", removeFromLikedProduct);

module.exports = Router;
