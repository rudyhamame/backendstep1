const express = require("express");
const FriendModel = require("../models/Profiles");
const UserModel = require("../models/Users");

const ConnectionStatusRouter = express.Router();

//app a new nonja to the db

ConnectionStatusRouter.put("/user/connection/:id", function (req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    useFindAndModify: false,
  })
    .then(function (result) {
      res.json(result);
    })
    .catch(next);
});

//Attach all the routes to router\
module.exports = ConnectionStatusRouter;
