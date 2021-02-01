const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const CredentialsSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  is_connected: { type: Boolean, default: false },
});
const CredentialsModel = mongoose.model("Credentials", CredentialsSchema);
module.exports = CredentialsModel;
