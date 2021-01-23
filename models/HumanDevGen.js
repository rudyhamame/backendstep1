const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const NotesSchema = new Schema({
  notes: { type: String, required: true },
});
const HumanDevGenNotes = mongoose.model("HumanDevGen", NotesSchema);
module.exports = HumanDevGenNotes;
