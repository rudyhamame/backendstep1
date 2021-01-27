const express = require("express");
const TodoSchema = require("../models/Todo");

const TodoRouter = express.Router();

//get a list of ninjas the the db
TodoRouter.get("/Todo", function (req, res, next) {
  TodoSchema.find({ task: "rudy" }).then((items) => res.json(items));
});

//app a new nonja to the db
TodoRouter.post("/Todo", function (req, res, next) {
  TodoSchema.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

TodoRouter.put("/Todo/:id", function (req, res, next) {
  TodoSchema.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      TodoSchema.findOne({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
      });
    }
  );
});

TodoRouter.delete("/Todo/:id", function (req, res, next) {
  TodoSchema.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja);
  });
});

//Attach all the routes to router\
module.exports = TodoRouter;
