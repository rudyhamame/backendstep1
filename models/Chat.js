const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  conversation: [
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      message: { type: String, required: true },
      date: { type: Date, default: new Date() },
      destination: { type: String, required: true },
      status: { type: String, default: "sent" },
    },
  ],
  isTyping: { type: Boolean, default: false },
});

const ChatModel = mongoose.model("chat", ChatSchema);
module.exports = ChatModel;
