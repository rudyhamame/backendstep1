const express = require("express");
const TodoSchema = require("../../models/Todo");

const TodoSearcher = express.Router();

//get a list of ninjas the the db
TodoSearcher.get("/Todo/search", function (req, res, next) {
  TodoSchema.find({ deadline: req.query.deadline }).then((result) =>
    res.json(result)
  );
});

//Attach all the routes to router\
module.exports = TodoSearcher;
