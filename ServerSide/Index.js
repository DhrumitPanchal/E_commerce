const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./routes/userRoute");
const ProductRouter = require("./routes/ProductRoute");
const OrderRouter = require("./routes/OrderRoute");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", UserRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);

const mongoDBURL = process.env.MONGODBURL;
const PORT = process.env.PORT;
try {
  app.listen(PORT, () => console.log("Server is running on : " + PORT));
  mongoose.connect(mongoDBURL).then(() => console.log("mongoDB connected"));
} catch (error) {
  console.log(error);
}
// "mongodb://127.0.0.1:27017/Ecommerce"
