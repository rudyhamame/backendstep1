const express = require("express");
const BioOfCellsNotes = require("../models/BioOfCells");

const router = express.Router();

//get a list of nonjas the the db
router.get("/BioOfCells", function (req, res, next) {
  BioOfCellsNotes.find().then((items) => res.json(items));
});

//app a new nonja to the db
router.post("/ninjas", function (req, res, next) {
  Notes.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

router.put("/ninjas/:id", function (req, res, next) {
  Notes.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Notes.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja);
    });
  });
});

router.delete("/ninjas/:id", function (req, res, next) {
  Notes.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja);
  });
});

//Attach all the routes to router\
module.exports = router;
