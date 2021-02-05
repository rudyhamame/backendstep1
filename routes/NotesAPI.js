const express = require("express");
const UserModel = require("../models/Users");

const UserRouter = express.Router();

//Get notes of a specific user
UserRouter.get("/user/notes/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then((user_notes) => res.json(user_notes.notes))
    .catch(next);
});

//Add new note to a specific user
UserRouter.post("/user/notes/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (user) {
      user.notes.push(req.body);
      return user.save();
    })
    .then(function (user) {
      res.json(user.notes.pop());
    })
    .catch(next);
});

//Edit a specific note of a specific user by id and idnotes
UserRouter.put("/user/notes/:id/:noteid/:newnote", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (user) {
      var index = user.notes.findIndex((note) => note.id === req.params.noteid);
      user.notes[index].text = req.params.newnote;
      user.notes[index].state = "edited";
      user.save();
      return user;
    })
    .then(function (user) {
      res.json(user.notes);
    })
    .catch(next);
});
//Delete a specific note of a specific user by id and idnotes
UserRouter.delete("/user/notes/:id/:noteid", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (user) {
      var index = user.notes.findIndex((note) => note.id === req.params.noteid);
      user.notes[index].remove();
      user.save();
      return "Successfully deleted";
    })
    .then(function (result) {
      res.json(result);
    })
    .catch(next);
});

//Attach all the routes to router\
module.exports = UserRouter;
