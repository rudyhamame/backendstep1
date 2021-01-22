const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const LoginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const LoginModel = mongoose.model("Login", LoginSchema);
module.exports = LoginModel;
