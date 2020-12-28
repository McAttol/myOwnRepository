const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("app");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors, (req, res)=>{
    res.end()
})
app.use(express.static("public"));

const User = require("./models/userModel");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/UsersQRCode",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
});

const userRouter = require("./routes/userRouter")(User);

app.use("api/user", userRouter);

app.listen(port, () => debug(`Server is running in port ${port}!`));