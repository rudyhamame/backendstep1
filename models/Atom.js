const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AtomSchema = new Schema({
  atomSymbol: { type: String, required: true },
  electronegativity: { type: String, required: true },
});
const AtomModel = mongoose.model("posts", AtomSchema);
module.exports = AtomModel;
