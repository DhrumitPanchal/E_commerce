const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./routes/userRoute");
const ProductRouter = require("./routes/ProductRoute");
const OrderRouter = require("./routes/OrderRoute");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", UserRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);

try {
  app.listen(8000, () => console.log("Server is running"));
  mongoose
    .connect(
      // "mongodb://127.0.0.1:27017/Ecommerce"
      "mongodb+srv://dhrumitpanchal:30072004@cluster0.xwyudpn.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("mongoDB connected"));
} catch (error) {
  console.log(error);
}
