const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const TodoSchema = new Schema({
  task: { type: String, required: true },
  deadline: { type: Date, required: true },
});
const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
