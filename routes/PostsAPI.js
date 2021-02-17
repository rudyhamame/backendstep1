const express = require("express");
const PostsModel = require("../models/Posts");
const PostsRouter = express.Router();

///////POST A POST//The best architecture
PostsRouter.post("/postAdd/:my_id", function (req, res, next) {
  PostsModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      mine.posts.unshift(req.body);
      return mine.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json(result.posts.shift());
      } else {
        res.status(500).json();
      }
    })
    .catch(next);
});

/////////Add Posts area
///Add your chat
PostsRouter.post("/create/:my_id", function (req, res, next) {
  PostsModel.create({ _id: req.params.my_id })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch(next);
});

module.exports = PostsRouter;
