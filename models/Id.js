const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const IdSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  phone_number: { type: Number, required: false },
  role: { type: String, default: "user" },
});
const IdModel = mongoose.model("Id", IdSchema);
module.exports = IdModel;
