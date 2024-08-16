const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PatientsSchema = new Schema({
  _id: { type: String },
  name: { type: String },
  dob: { type: String },
  gender: { type: String },
  height: { type: String },
  weight: { type: String },
  ethnisity: { type: String },
  marital_status: { type: String },
  education_level: { type: String },
  home_address: { type: String },
  contact_information: { type: String },
});

const PatientsModel = mongoose.model("patients", PatientsSchema);
module.exports = PatientsModel;
