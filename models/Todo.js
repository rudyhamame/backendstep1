const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const TodoSchema = new Schema({
  task: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
