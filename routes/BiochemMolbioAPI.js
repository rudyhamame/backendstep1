const express = require("express");
const BiochemMolbioNotes = require("../models/BiochemMolbio");

const router = express.Router();

//get a list of nonjas the the db
router.get("/BiochemMolbio", function (req, res, next) {
  BiochemMolbioNotes.find().then((items) => res.json(items));
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
