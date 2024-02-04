const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
async function handleUserRegister(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ msq: "invalid credentials" });
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "user already exist" });
  const HashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      password: HashPassword,
    });

    res.status(201).json({ msg: "user register successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ msg: "email and password are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user not Found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      res.status(200).json({ msg: "login successfully" });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  handleUserRegister: handleUserRegister,
  handleUserLogin: handleUserLogin,
};
