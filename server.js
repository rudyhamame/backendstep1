const express = require("express");
const routes = require("./routes/api");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

app.use(cors());

//WothiQggDIPmqBYc
//connect to mongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const app = express(); // initialie express
//we use this middleware to access the body of the request

app.use(express.json());

//initialize routes
app.use("/api", routes);

//error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 4000, function () {
  console.log("now listening on port 4000");
});
