const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const env = require("./utils/env");
const userRoute = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.CLIENT,
    credentials: true,
  }),
);

app.use("/user", userRoute);

module.exports = app;
