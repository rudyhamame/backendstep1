const express = require("express");
const UserModel = require("../models/Users");

const CredentialsRouter = express.Router();

//get a list of nonjas the the db
CredentialsRouter.get("/user/credentials", function (req, res, next) {
  UserModel.findOne({
    username: req.query.username,
  }).then((result) => res.json(result));
});

CredentialsRouter.post("/user/credentials", function (req, res, next) {
  UserModel.create(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});

CredentialsRouter.put("/user/credentials/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      UserModel.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    }
  );
});
module.exports = CredentialsRouter;
