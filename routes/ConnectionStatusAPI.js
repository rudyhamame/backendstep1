const express = require("express");
const UserModel = require("../models/Users");

const ConnectionStatusRouter = express.Router();

//app a new nonja to the db

ConnectionStatusRouter.put("/user/connection/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});

//Attach all the routes to router\
module.exports = ConnectionStatusRouter;
