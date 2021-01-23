const express = require("express");
const BioOfCellsSchema = require("../models/BioOfCells");

const BioOfCellsRouter = express.Router();

//get a list of nonjas the the db
BioOfCellsRouter.get("/BioOfCells", function (req, res, next) {
  BioOfCellsSchema.find().then((items) => res.json(items));
});

//app a new nonja to the db
BioOfCellsRouter.post("/BioOfCells", function (req, res, next) {
  BioOfCellsSchema.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

BioOfCellsRouter.put("/BioOfCells/:id", function (req, res, next) {
  BioOfCellsSchema.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      BioOfCellsSchema.findOne({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
      });
    }
  );
});

BioOfCellsRouter.delete("/BioOfCells/:id", function (req, res, next) {
  BioOfCellsSchema.findByIdAndRemove({ _id: req.params.id }).then(function (
    ninja
  ) {
    res.send(ninja);
  });
});

//Attach all the routes to router\
module.exports = BioOfCellsRouter;
