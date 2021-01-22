const express = require("express");
const LoginModel = require("../models/Login");

const LoginRouter = express.Router();

//get a list of nonjas the the db
LoginRouter.get("/login", function (req, res, next) {
  LoginModel.find().then((items) => res.json(items));
});

LoginRouter.post("/login", function (req, res, next) {
  LoginModel.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});
module.exports = LoginRouter;
