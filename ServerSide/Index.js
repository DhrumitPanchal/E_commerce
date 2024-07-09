const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./routes/userRoute");
const ProductRouter = require("./routes/ProductRoute");
const OrderRouter = require("./routes/OrderRoute");
const cookieParser = require("cookie-parser");
// const passport = require("passport");
// const expresssession = require("express-session");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use express-session middleware with secret option
// app.use(
//   expresssession({
//     secret: "dhrumitpanchal", // Replace 'your_secret_here' with your actual secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
//   })
// );

app.use("/", UserRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);
app.use("/auth", UserRouter);

const mongoDBURL = process.env.MONGODBURL;
const PORT = process.env.PORT;

// // Initialize Passport after express-session
// app.use(passport.initialize());
// app.use(passport.session());

try {
  app.listen(PORT, () => console.log("Server is running on : " + PORT));
  mongoose.connect(mongoDBURL).then(() => console.log("mongoDB connected"));
} catch (error) {
  console.log(error);
}
