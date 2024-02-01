const express = require("express");
const { hendleUserRegister, hendleUserLogin } = require("../controllers/Auth");
const Router = express.Router();

Router.get("/auth", (req, res) => {
  res.json({ msg: "working" });
});
Router.post("/register", hendleUserRegister);
Router.post("/login", hendleUserLogin);

module.exports = Router;
