const User = require("../models/UserModel");
const mongoose = require("mongoose");
// liked product controllers -------------------------------------------------------------------

async function getLikedProducts(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(401).json({ msg: "undefined user" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
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
    return res.status(401).json({ msg: "undefined user id and product id" });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
  }
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: "product ID is not valid" });
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
    return res.status(401).json({ msg: "undefined user id and product id" });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
  }
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: "product ID is not valid" });
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
    return res.status(201).json({ msg: "product removed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
}

// cart product controllers -------------------------------------------------------------------

async function getCartProducts(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(401).json({ msg: "undefined user" });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
  }
  try {
    await User.findById(id)
      .then((result) => {
        return res.status(201).json({ result: result.cartProducts });
      })
      .catch((err) => {
        return res.status(400).json({ msg: "user not found" });
      });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
}

async function addCartProduct(req, res) {
  const { id, productId, Quantity, Prize } = req.body;
  if (!id || !productId || !Quantity || !Prize) {
    return res.status(401).json({ msg: "undefined user id and product id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
  }
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: "product ID is not valid" });
  }
  try {
    const findUser = await User.findById(id).catch((err) => {
      return res.status(400).json({ msg: "user not found" });
    });

    await User.findByIdAndUpdate(id, {
      cartProducts: [
        ...findUser.cartProducts,
        { ProductID: productId, Quantity: Quantity, Prize: Prize },
      ],
    });
    return res.status(201).json({ msg: "product added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
}

async function removeFromCartProduct(req, res) {
  const { id, productId } = req.body;

  if (!id || !productId) {
    return res.status(401).json({ msg: "undefine user id and product id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
  }
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: "product ID is not valid" });
  }
  try {
    const findUser = await User.findById(id).catch((err) => {
      return res.status(400).json({ msg: "user not found" });
    });

    await User.findByIdAndUpdate(id, {
      cartProducts: findUser.cartProducts.filter(
        (item) => item.ProductID !== productId
      ),
    });
    return res.status(201).json({ msg: "product removed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
}

async function updateCartProduct(req, res) {
  const { id, productId, Quantity, Prize } = req.body;
  if (!id || !productId || !Quantity) {
    return res.status(401).json({ msg: "undefined user id and product id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ msg: "user ID is not valid" });
  }
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: "product ID is not valid" });
  }
  try {
    const findUser = await User.findById(id).catch((err) => {
      return res.status(400).json({ msg: "user not found" });
    });

    let updatedList = findUser.cartProducts.filter(
      (item) => item.ProductID !== productId
    );
    updatedList.push({
      ProductID: productId,
      Quantity: Quantity,
      Prize: Prize,
    });

    await User.findByIdAndUpdate(id, { cartProducts: updatedList });
    return res.status(201).json({ msg: "product added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
}

module.exports = {
  addLikedProduct,
  removeFromLikedProduct,
  getLikedProducts,
  getCartProducts,
  addCartProduct,
  removeFromCartProduct,
  updateCartProduct,
};
