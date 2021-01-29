const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const NotesSchema = new Schema({
  notes: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  textbook: { type: String, required: false },
  page: { type: String, required: false },
  date: { type: new Date() },
});
const NotesModel = mongoose.model("NotesModel", NotesSchema);
module.exports = NotesModel;
