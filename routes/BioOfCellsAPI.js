const express = require("express");
const NotesModel = require("../models/Notes");

const expressRouter = express.Router();

//get a list of nonjas the the db
expressRouter.get("/BioOfCells", function (req, res, next) {
  NotesModel.find().then((result) => res.json(result));
});

//app a new nonja to the db
expressRouter.post("/BioOfCells", function (req, res, next) {
  NotesModel.create(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(next);
});

expressRouter.put("/BioOfCells/:id", function (req, res, next) {
  NotesModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      NotesModel.findOne({ _id: req.params.id }).then(function (result) {
        res.send(result);
      });
    }
  );
});

expressRouter.delete("/BioOfCells/:id", function (req, res, next) {
  NotesModel.findByIdAndRemove({ _id: req.params.id }).then(function (result) {
    res.send(result);
  });
});

//Attach all the routes to router\
module.exports = expressRouter;
