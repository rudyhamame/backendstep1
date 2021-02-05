const express = require("express");
const UserModel = require("../models/Users");

const UserRouter = express.Router();

//Get todolist of a specific user
UserRouter.get("/user/todolist/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then((user_todolist) => res.json(user_todolist.todolist))
    .catch(next);
});

//Add new todo to a specific user
UserRouter.post("/user/todolist/:id", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (user) {
      user.todolist.push(req.body);
      return user.save();
    })
    .then(function (user) {
      res.json(user.todolist.pop());
    })
    .catch(next);
});

//Edit a specific todo of a specific user by id and idtodolist
UserRouter.put(
  "/user/todolist/:id/:todoid/:newtodo",
  function (req, res, next) {
    UserModel.findOne({ _id: req.params.id })
      .then(function (user) {
        var index = user.todolist.findIndex(
          (todo) => todo.id === req.params.todoid
        );
        user.todolist[index].task = req.params.newtodo;
        user.todolist[index].state = "edited";
        user.save();
        return user;
      })
      .then(function (user) {
        res.json(user.todolist);
      })
      .catch(next);
  }
);
//Delete a specific todo of a specific user by id and idtodolist
UserRouter.delete("/user/todolist/:id/:todoid", function (req, res, next) {
  UserModel.findOne({ _id: req.params.id })
    .then(function (user) {
      var index = user.todolist.findIndex(
        (todo) => todo.id === req.params.todoid
      );
      user.todolist[index].remove();
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
