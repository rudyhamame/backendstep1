const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const FriendsListSchema = new Schema({
  username: { type: String, required: true },
  phone_number: { type: Number, required: false },
});
const FriendsListModel = mongoose.model("FriendsList", FriendsListSchema);
module.exports = FriendsListModel;
