const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./routes/userRoute");
const ProductRouter = require("./routes/ProductRoute");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", UserRouter);
app.use("/products", ProductRouter);

try {
  app.listen(8000, () => console.log("Server is running"));
  mongoose
    .connect("mongodb://127.0.0.1:27017/Ecommerce")
    .then(() => console.log("mongoDB connected"));
} catch (error) {
  console.log(error);
}
