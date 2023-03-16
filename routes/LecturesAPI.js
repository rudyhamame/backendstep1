//For user data
const express = require("express");
const LecturesModel = require("../models/Lectures");
const LecturesRouter = express.Router();
const UserModel = require("../models/Users");
require("dotenv/config");

//..............CREATE LECTURE
LecturesRouter.post("/createLecture", function (req, res, next) {
  LecturesModel.create(req.body)
    .then((result) => {
      if (result) {
        return res.status(201).json(result);
      }
    })
    .catch(next);
});

//..............ADD LECTURE TO USER.............
LecturesRouter.post(
  "/addLecture/:my_id/:lecture_id",
  function (req, res, next) {
    UserModel.findOne({ _id: req.params.my_id })
      .then((mine) => {
        mine.posts.push(req.params.lecture_id);
        return mine.save();
      })
      .then((result) => {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(500).json();
        }
      })
      .catch(next);
  }
);

//////////////RetriveLectures
LecturesRouter.get("/retrieveLectures/:my_id", function (req, res, next) {
  LecturesModel.findOne({ _id: req.params.my_id })
    .then((mine) => {
      res.status(200).json(mine.lectures);
    })
    .catch(next);
});

//////////////////////DeleteLecture
LecturesRouter.delete(
  "/deleteLecture/:my_id/:lectureId",
  function (req, res, next) {
    LecturesModel.findOne({ _id: req.params.my_id })
      .then((mine) => {
        for (var i = 0; i < mine.lectures.length; i++) {
          if (mine.lectures[i]._id == req.params.lectureId) {
            mine.lectures.splice(i, 1);
          }
        }
        return mine.save();
      })
      .then((result) => {
        if (result) {
          res.status(201).json();
        }
      })
      .catch(next);
  }
);

//Attach all the routes to router\
module.exports = LecturesRouter;
