const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const NotesSchema = new Schema({
  notes: { type: String, required: true },
});
const BioOfCellsNotes = mongoose.model("BioOfCells", NotesSchema);
module.exports = BioOfCellsNotes;
