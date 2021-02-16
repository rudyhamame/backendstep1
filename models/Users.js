const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

const UserSchema = new Schema({
  info: {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      required: true,
    },
    dob: { type: Date, required: false },
  },

  friend_requests: [
    //I can post my username to friend request field in the user connection and then if he accepted my invitation he will post his username in friend request with accepted to be true and he will edit the acceped false on my profile
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
    },
  ],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],

  chat: { type: Schema.Types.ObjectId, ref: "chat" },

  status: {
    isConnected: { type: Boolean, default: false },
  },
  notifications: [
    {
      id: { type: String, required: true },
      message: { type: String, required: true },
      status: { type: String, default: "unread" },
    },
  ],
  posts: [
    {
      note: { type: String, required: true },
      category: { type: String, required: true },
      subject: { type: String, required: true },
      reference: { type: String, required: false },
      page_num: { type: String, required: false },
    },
  ],
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
