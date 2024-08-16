const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express(); // initialie express
/////////////////////////////////////////////////////////////
const UserAPI = require("./routes/UserAPI");
const ChatAPI = require("./routes/ChatAPI");
const PatientsAPI = require("./routes/PatientsAPI");
const AtomAPI = require("./routes/AtomAPI");
const KeywordsAPI = require("./routes/KeywordsAPI");

require("dotenv/config");

//...........openAI.................
const config = new Configuration({
  apiKey:
    "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",
});
const openai = new OpenAIApi(config);

//..................

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
///////////////////////////////openai/////////////////////////////////////

///////////////////////////////////////////////////////
//we use this middleware to access the body of the request
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
//initialize routes
app.use("/api/user", UserAPI);
app.use("/api/chat", ChatAPI);
app.use("/api/patients", PatientsAPI);
app.use("/api/atom", AtomAPI);
app.use("/api/keywords", KeywordsAPI);

// app.use("/api/posts", PostsAPI);

app.use(function (error, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-devinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

//...................................................

app.listen(process.env.PORT || 4000, function () {
  console.log("now listening on port 4000");
});
