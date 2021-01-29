const express = require("express");
const TodoModel = require("../models/Todo");

const TodoRouter = express.Router();

//get a list of results the the db
TodoRouter.get("/Todo", function (req, res, next) {
  TodoModel.find({}).then((result) => res.json(result));
});

//app a new nonja to the db
TodoRouter.post("/Todo", function (req, res, next) {
  TodoModel.create(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});

TodoRouter.put("/Todo/:id", function (req, res, next) {
  TodoModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      TodoModel.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    }
  );
});

TodoRouter.delete("/Todo/:id", function (req, res, next) {
  TodoModel.findByIdAndRemove({ _id: req.params.id }).then(function (result) {
    res.send(result);
  });
});

//Attach all the routes to router\
module.exports = TodoRouter;
