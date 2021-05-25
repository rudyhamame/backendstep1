const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TestSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const TestModel = mongoose.model("Test", TestSchema);
module.exports = TestModel;
