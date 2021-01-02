const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  name: { type: String },
  surname: { type: String },
  passport: { type: String },
  address: { type: String },
  phone: { type: Number },
});

module.exports = mongoose.model("Users", userModel);