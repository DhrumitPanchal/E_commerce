const Product = require("../models/ProductModel");
async function getAllProducts(req, res) {
  try {
    const allproduct = await Product.find();
    res.status(200).json({ result: allproduct });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function AddProduct(req, res) {
  console.log(req.body);

  const {
    product_name,
    product_category,
    product_description,
    product_price,
    discount_rate,
    product_brand,
    Image_url,
    product_stock,
  } = req.body;

  if (
    !product_name ||
    !product_category ||
    !product_description ||
    !product_price ||
    !product_brand ||
    !Image_url ||
    !product_stock
  )
    return res.json({ msg: "all product details is required" });
  try {
    const product = await Product.create({
      product_name,
      product_category,
      product_description,
      product_price,
      discount_rate,
      product_stock,
      product_brand,
      Image_url,
    });

    res
      .status(200)
      .json({ mas: "Product added successfully", result: product });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

async function UpdateProduct(req, res) {
  const { id, data } = req.body;
  console.log(id, data);
  if (!id || !data) return res.json({ msg: "product id and data is required" });
  try {
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data);
    res
      .status(200)
      .json({ updatedProduct, msg: "product updated successfully" });
  } catch (error) {
    return res.status(500).json({ error, msg: "Internal server error" });
  }
}

async function DeleteProduct(req, res) {
  const { id } = req.body;

  if (!id) return res.json({ msg: "product id is required" });

  try {
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: "Product deleted successfully", result: deletedProduct });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { getAllProducts, AddProduct, UpdateProduct, DeleteProduct };
