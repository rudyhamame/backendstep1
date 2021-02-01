const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const FriendsListSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
});
const FriendsListModel = mongoose.model("FriendsList", FriendsListSchema);
module.exports = FriendsListModel;
