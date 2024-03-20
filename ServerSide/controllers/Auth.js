const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();

    res.status(201).json({ msg: "user register successfully", allUsers });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleUserRegister(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ msg: "invalid credentials" });
  }
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
    if (!email || !password) {
      return res.status(400).json({ msg: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user not Found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const Payload = {
        ...user,
      };
      const token = await jwt.sign(Payload, process.env.jwtSecretKey);
      const newObject = {
        access_Token: token,
        msg: "login successfully",
        user: user,
      };
      res.status(200).json(newObject);
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handelJwtTokenBasedLogin(req, res) {
  const { access_Token } = req.body;
  if (access_Token) {
    const result = await jwt.verify(access_Token, process.env.jwtSecretKey);
    if (result) {
      const user = await User.findById(result._doc._id);
      return res.status(200).json(user);
    } else {
      return res.status(403).json("Invalid Token");
    }
  }
}

async function handelAdminAccess(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password)
    return res.status(404).json({ msg: "email and password are required" });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "incorrect credential" });
    }

    if (user.userRole === "admin") {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(404).json({ msg: "incorrect credential" });
      }

      return res
        .status(200)
        .json({ msg: "login success as admin", role: user.userRole });
    }

    return res.status(404).json({ msg: "incorrect credential" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  handleUserRegister,
  handleUserLogin,
  getAllUsers,
  handelJwtTokenBasedLogin,
  handelAdminAccess,
};
