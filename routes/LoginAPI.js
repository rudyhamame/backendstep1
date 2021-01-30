const express = require("express");
const LoginModel = require("../models/Login");

const LoginRouter = express.Router();

//get a list of nonjas the the db
LoginRouter.get("/login", function (req, res, next) {
  LoginModel.find().then((result) => res.json(result));
});

LoginRouter.post("/login", function (req, res, next) {
  LoginModel.create(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});

LoginRouter.put("/login/:id", function (req, res, next) {
  LoginModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      LoginModel.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    }
  );
});
module.exports = LoginRouter;
