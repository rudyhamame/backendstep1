const express = require("express");
const UserModel = require("../models/Users");

const UserRouter = express.Router();

//get a list of results the the db
UserRouter.get("/user", function (req, res, next) {
  UserModel.find({}).then((result) => res.json(result));
});

//get a list of results the the db
UserRouter.post("/user/new", function (req, res, next) {
  UserModel.create(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});
//get a list of results the the db
UserRouter.get("/user/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id }).then((result) => res.json(result));
});

//app a new nonja to the db
UserRouter.post("/user/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (user) {
      user.friends_list.push(req.body);
      return user.save();
    })
    .then(function (user) {
      res.json(user.friends_list.pop());
    })
    .catch(next);
});

UserRouter.put("/user/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      UserModel.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    }
  );
});

UserRouter.delete("/user/:id", function (req, res, next) {
  UserModel.findByIdAndRemove({ _id: req.params.id }).then(function (result) {
    res.send(result);
  });
});

//Attach all the routes to router\
module.exports = UserRouter;
