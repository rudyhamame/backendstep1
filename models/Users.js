const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  text: { type: String, required: false },
  category: { type: String, required: false },
  subject: { type: String, required: false },
  textbook: { type: String, required: false },
  page: { type: String, required: false },
  date: { type: Date, default: Date.now() },
  state: { type: String },
});
const FriendsListSchema = new Schema({
  friend_id: { type: String, required: true },
});
const TodoSchema = new Schema({
  task: { type: String, required: true },
  deadline: { type: Date, required: true },
});

//create Ninja Schema and model
const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: false },
  dob: { type: Date, required: false },
  phone_number: { type: Number, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  friends_list: [FriendsListSchema],
  notes: [NotesSchema],
  todolist: [TodoSchema],
  is_loggingin: { type: Boolean, required: true, default: false },
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
