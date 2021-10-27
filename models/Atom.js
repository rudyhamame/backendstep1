const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AtomSchema = new Schema({
  atomSymbol: { type: String, required: true },
  electronegativity: { type: Number, required: true },
});
const AtomModel = mongoose.model("atom", AtomSchema);
module.exports = AtomModel;
