const express = require("express");
const LoginSchema = require("../models/Login");

const LoginRouter = express.Router();

//get a list of nonjas the the db
LoginRouter.get("/login", function (req, res, next) {
  LoginSchema.find().then((items) => res.json(items));
});
module.exports = LoginRouter;
