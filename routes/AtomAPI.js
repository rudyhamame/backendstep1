const express = require("express");
const AtomModel = require("../models/Atom");
const AtomRouter = express.Router();

AtomRouter.post("/newAtom/", function (req, res, next) {
  AtomModel.create(req.body);
});

module.exports = AtomRouter;
