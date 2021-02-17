const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  posts: [
    {
      note: { type: String, required: true },
      category: { type: String, required: true },
      subject: { type: String, required: true },
      reference: { type: String, required: false },
      page_num: { type: Number, required: false },
      date: { type: Date, default: Date.now() },
    },
  ],
});

const PostsModel = mongoose.model("posts", PostsSchema);
module.exports = PostsModel;
