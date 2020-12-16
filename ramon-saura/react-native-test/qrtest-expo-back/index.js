const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("app");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const User = require("./models/userModel");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = mongoose.connect("mongodb://localhost/UsersQRCode")

const userRouter = require("./routes/userRouter")(User);

app.use("api/user", userRouter);

app.listen(port, () => debug(`Server is running in port ${port}!`));