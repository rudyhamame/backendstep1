const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostsSchema = new Schema({
  note: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  reference: { type: String, required: false },
  page_num: { type: String, required: false },
});

const PostsModel = mongoose.model("posts", PostsSchema);
module.exports = PostsModel;
