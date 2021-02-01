const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  notes: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  textbook: { type: String, required: false },
  page: { type: String, required: false },
  date: { type: Date, default: Date.now() },
});
const CredentialsSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  is_connected: { type: Boolean, default: false },
});
const FriendsListSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
});
const TodoSchema = new Schema({
  task: { type: String, required: true },
  deadline: { type: Date, required: true },
});
const ConnectionStatusSchema = new Schema({
  is_loggedin: { type: Boolean, default: false },
});
const IdSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  phone_number: { type: Number, required: false },
  role: { type: String, default: "user" },
});
//create Ninja Schema and model
const UserSchema = new Schema({
  credentials: [CredentialsSchema],
  id: [IdSchema],
  connection_status: [ConnectionStatusSchema],
  friends_list: [FriendsListSchema],
  notes: [NotesSchema],
  todo: [TodoSchema],
  role: { type: String, default: "user" },
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
