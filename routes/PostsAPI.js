const express = require("express");
const PostsModel = require("../models/Posts");
const PostsRouter = express.Router();

///////POST A POST
PostsRouter.post("/postAdd/:my_id", function (req, res, next) {
  PostsModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      mine.posts.push(req.body);
      mine.save();
    })
    .then((response) => {
      res.json(response);
    })
    .catch(next);
});

/////////Add Posts area
///Add your chat
PostsRouter.post("/create/:my_id", function (req, res, next) {
  PostsModel.findOne({ _id: req.params.my_id })
    .then((result) => {
      if (result) {
        return null;
      } else {
        PostsModel.create({ _id: req.params.my_id });
      }
    })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch(next);
});

module.exports = PostsRouter;
