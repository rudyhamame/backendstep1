const express = require("express");
const AtomModel = require("../models/Atom");
const AtomRouter = express.Router();

AtomRouter.post("/newAtom/", function (req, res, next) {
  AtomModel.create(req.body)
    .then((result) => {
      if (result) res.status(201).json(result);
    })
    .catch(next);
});

AtomRouter.get("/getAtom/", function (req, res, next) {
  AtomModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});
module.exports = AtomRouter;
