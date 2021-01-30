const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const LoginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  phone_number: { type: Number, required: false },
  isConnnected: { type: Boolean, default: false },
});
const LoginModel = mongoose.model("Login", LoginSchema);
module.exports = LoginModel;
