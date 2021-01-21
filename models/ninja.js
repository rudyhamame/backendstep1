const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const NinjaSchema = new Schema({
  notes: { type: String, required: [true, "Name field is required"] },
});
const Ninja = mongoose.model("Rudy", NinjaSchema);
module.exports = Ninja;
