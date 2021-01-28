const express = require("express");
const TodoAPI = require("./routes/TodoAPI");
const HumanDevGenNotesAPI = require("./routes/HumanDevGenAPI");
const BioOfCellsNotesAPI = require("./routes/BioOfCellsAPI");
const BiochemMolbioNotesAPI = require("./routes/BiochemMolbioAPI");
const LoginAPI = require("./routes/LoginAPI");
const TodoSearchAPI = require("./routes/search/TodoSearchAPI");

var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

//WothiQggDIPmqBYc
//connect to mongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const app = express(); // initialie express
//we use this middleware to access the body of the request
app.use(cors());

app.use(express.json());

//initialize routes
app.use("/api", TodoAPI);
app.use("/api", HumanDevGenNotesAPI);
app.use("/api", BioOfCellsNotesAPI);
app.use("/api", BiochemMolbioNotesAPI);
app.use("/", LoginAPI);

app.use("/api", TodoSearchAPI);

//error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 4000, function () {
  console.log("now listening on port 4000");
});
