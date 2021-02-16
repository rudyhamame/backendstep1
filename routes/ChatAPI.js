const express = require("express");
const ChatModel = require("../models/Chat");
const ChatRouter = express.Router();

///Add your chat
ChatRouter.post("/addNew/:my_id", function (req, res, next) {
  ChatModel.findOne({ _id: req.params.my_id })
    .then((result) => {
      if (result) {
        return null;
      } else {
        ChatModel.create({ _id: req.params.my_id });
      }
    })
    .then((result) => {
      return res.status(201).json(result);
    });
});
//Send to friend chat
ChatRouter.post("/sendToFriend/:friendID", function (req, res, next) {
  ChatModel.findOne({ _id: req.params.friendID })
    .then((chatObject) => {
      chatObject.conversation.push(req.body);
      return chatObject.save();
    })
    .then((result) => {
      return res.status(201).json(result.conversation);
    })
    .catch(next);
});

//Send to me chat
ChatRouter.post("/sendToMe/:my_id", function (req, res, next) {
  ChatModel.findOne({ _id: req.params.my_id })
    .then((chatObject) => {
      chatObject.conversation.push(req.body);
      return chatObject.save();
    })
    .then((result) => {
      return res.status(201).json(result.conversation);
    })
    .catch(next);
});

//Attach all the routes to router\
module.exports = ChatRouter;
