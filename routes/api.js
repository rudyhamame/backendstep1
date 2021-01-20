const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();

//get a list of nonjas the the db
router.get("/ninjas", function (req, res, next) {
  Ninja.find().then((items) => res.json(items));
});

//app a new nonja to the db
router.post("/ninjas", function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .then(() => {
      Ninja[Ninja.length].find().then((items) => res.json(items));
    })
    .catch(next);
});

router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja);
    });
  });
});

router.delete("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja);
  });
});

//Attach all the routes to router\
module.exports = router;
