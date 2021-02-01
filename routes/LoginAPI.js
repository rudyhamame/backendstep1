const express = require("express");
const UserModel = require("../models/Users");

const LoginRouter = express.Router();

//get a list of nonjas the the db
LoginRouter.get("/login", function (req, res, next) {
  UserModel.find().then((result) => res.json(result));
});

LoginRouter.post("/login", function (req, res, next) {
  UserModel.create(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});

LoginRouter.put("/login/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      UserModel.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    }
  );
});
module.exports = LoginRouter;
