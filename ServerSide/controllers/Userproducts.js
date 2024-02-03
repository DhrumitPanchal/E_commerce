const User = require("../models/UserModle");

async function getLikedProducts(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(401).json({ msg: "undefind user" });
  }
  try {
    await User.findById(id)
      .then((result) => {
        return res.status(201).json({ result: result.likedProducts });
      })
      .catch((err) => {
        return res.status(400).json({ msg: "user not found" });
      });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
}

async function addLikedProduct(req, res) {
  const { id, productId } = req.body;
  if (!id || !productId) {
    return res.status(401).json({ msg: "undefind user id and product id" });
  }
  try {
    const findUser = await User.findById(id).catch((err) => {
      return res.status(400).json({ msg: "user not found" });
    });

    await User.findByIdAndUpdate(id, {
      likedProducts: [...findUser.likedProducts, { productId }],
    });
    return res.status(201).json({ msg: "product added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
}

async function removeFromLikedProduct(req, res) {
  const { id, productId } = req.body;
  if (!id || !productId) {
    return res.status(401).json({ msg: "undefind user id and product id" });
  }
  try {
    const findUser = await User.findById(id).catch((err) => {
      return res.status(400).json({ msg: "user not found" });
    });

    await User.findByIdAndUpdate(id, {
      likedProducts: findUser.likedProducts.filter(
        (item) => item.productId !== productId
      ),
    });
    return res.status(201).json({ msg: "product removed succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
}

module.exports = { addLikedProduct, removeFromLikedProduct, getLikedProducts };