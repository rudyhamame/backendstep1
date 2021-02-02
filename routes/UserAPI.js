const express = require("express");
const UserModel = require("../models/Users");

const UserRouter = express.Router();

//get a list of results the the db
UserRouter.get("/user", function (req, res, next) {
  UserModel.find({}).then((result) => res.json(result));
});

//app a new nonja to the db
UserRouter.post("/user", function (req, res, next) {
  UserModel.create(req.body)
    .then(function (result) {
      res.send(result);
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
