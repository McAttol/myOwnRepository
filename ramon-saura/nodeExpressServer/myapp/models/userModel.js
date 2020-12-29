const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  email: { type: String },
  email_verificated: { type: Boolean },
  family_name: { type: String },
  given_name: { type: String },
  picture: { type: String },
  sub: { type: String },
  department: { type: String },
});

module.exports = mongoose.model("Users", userModel);