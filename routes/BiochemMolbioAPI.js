const express = require("express");
const BiochemMolbioSchema = require("../models/BiochemMolbio");

const BiochemMolbioRouter = express.Router();

//get a list of nonjas the the db
BiochemMolbioRouter.get("/BiochemMolbio", function (req, res, next) {
  BiochemMolbioSchema.find().then((items) => res.json(items));
});

//app a new nonja to the db
BiochemMolbioRouter.post("/BiochemMolbio", function (req, res, next) {
  BiochemMolbioSchema.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

BiochemMolbioRouter.put("/ninjas/:id", function (req, res, next) {
  BiochemMolbioSchema.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      BiochemMolbioSchema.findOne({ _id: req.params.id }).then(function (
        ninja
      ) {
        res.send(ninja);
      });
    }
  );
});

BiochemMolbioRouter.delete("/ninjas/:id", function (req, res, next) {
  BiochemMolbioSchema.findByIdAndRemove({ _id: req.params.id }).then(function (
    ninja
  ) {
    res.send(ninja);
  });
});

//Attach all the routes to router\
module.exports = BiochemMolbioRouter;
