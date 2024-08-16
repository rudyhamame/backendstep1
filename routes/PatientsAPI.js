const express = require("express");
const PatientsModel = require("../models/Patients");
const PatientsRouter = express.Router();

PatientsRouter.post("/addPatient", function (req, res, next) {
  PatientsModel.create(req.body)
    .then((patient) => {
      res.status(201).json(patient);
    })
    .catch(next);
});

PatientsRouter.get("/getPatients", function (req, res, next) {
  PatientsModel.find({})
    .then((patients) => {
      res.status(200).json(patients);
    })
    .catch(next);
});

PatientsRouter.delete("/deletePatient/:id", function (req, res, next) {
  PatientsModel.deleteMany({ _id: req.params.id })
    .then((patients) => {
      res.status(200).json(patients);
    })
    .catch(next);
});
module.exports = PatientsRouter;
