const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express(); // initialie express
////////////////////////////////////////

/////////////////////////////////////////////////////////////
const UserAPI = require("./routes/UserAPI");
const ChatAPI = require("./routes/ChatAPI");
// const PostsAPI = require("./routes/PostsAPI");

require("dotenv/config");

//////////////////////////connect to mongoDB///////////////////////////////
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database is connected!");
});
////////////////////////////////////////////////////////////////////

//we use this middleware to access the body of the request
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//initialize routes
app.use("/api/user", UserAPI);
app.use("/api/chat", ChatAPI);
// app.use("/api/posts", PostsAPI);

app.use(function (error, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT || 4000, function () {
  console.log("now listening on port 4000");
});
