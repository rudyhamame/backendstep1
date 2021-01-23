const express = require("express");
const HumanDevGenSchema = require("../models/HumanDevGen");

const HumanDevGenRouter = express.Router();

//get a list of nonjas the the db
HumanDevGenRouter.get("/HumanDevGen", function (req, res, next) {
  HumanDevGenSchema.find().then((items) => res.json(items));
});

//app a new nonja to the db
HumanDevGenRouter.post("/ninjas", function (req, res, next) {
  HumanDevGenSchema.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

HumanDevGenRouter.put("/ninjas/:id", function (req, res, next) {
  HumanDevGenSchema.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      HumanDevGenSchema.findOne({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
      });
    }
  );
});

HumanDevGenRouter.delete("/ninjas/:id", function (req, res, next) {
  HumanDevGenSchema.findByIdAndRemove({ _id: req.params.id }).then(function (
    ninja
  ) {
    res.send(ninja);
  });
});

//Attach all the routes to router\
module.exports = HumanDevGenRouter;
