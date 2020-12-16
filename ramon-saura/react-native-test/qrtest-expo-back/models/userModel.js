const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
    passport: {type: String},              
    name: {type: String},
    surname: {type: String},              
    phone: {type: Number},
    address: {type: String},              
});

module.export = mongoose.model("Users", userModel);