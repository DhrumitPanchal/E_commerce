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
  if (!access_Token) {
    return res.status(400).json({ msg: "Token is required" });
  }

  try {
    const decoded = await jwt.verify(access_Token, process.env.jwtSecretKey);
    const user = await User.findById(decoded._doc._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(403).json({ msg: "Invalid Token" });
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

async function GoogleLogin(req, res) {
  try {
    const { credential } = req.body;
    const decoded = await jwt.decode(credential.credential);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      const HashPassword = await bcrypt.hash(decoded.sub, 10);

      const newUser = await User.create({
        name: decoded.name,
        email: decoded.email,
        userRole: "user",
        password: HashPassword,
      });

      const Payload = {
        ...newUser,
      };
      const token = await jwt.sign(Payload, process.env.jwtSecretKey);
      const newObject = {
        msg: "login successfully",
        user: user,
      };
      return res.status(201).json({
        msg: "user register successfully",
        newObject,
        access_Token: token,
      });
    }

    const checkPassword = await bcrypt.compare(decoded?.sub, user.password);
    if (checkPassword) {
      const Payload = {
        ...user,
      };
      const token = await jwt.sign(Payload, process.env.jwtSecretKey);
      const newObject = {
        msg: "login successfully",
        user: user,
      };
      return res.status(201).json({
        msg: "user register successfully",
        newObject,
        access_Token: token,
      });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
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
  GoogleLogin,
};
