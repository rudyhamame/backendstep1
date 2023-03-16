const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LecturesSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  instructor_name: { type: String, required: true },
  library_name: { type: String, required: true },
  year: { type: String, required: true },
  term: { type: String, required: true },
  status: { type: String },
  total_number_of_pages: { type: Number, required: true },
  finish_number_of_pages: { type: Number },
});

const LecturesModel = mongoose.model("lectures", LecturesSchema);
module.exports = LecturesModel;
