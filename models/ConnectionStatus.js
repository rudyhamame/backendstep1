const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Ninja Schema and model
const ConnectionStatusSchema = new Schema({
  is_loggedin: { type: Boolean, default: false },
});
const ConnectionStatusModel = mongoose.model(
  "Connection_status",
  ConnectionStatusSchema
);
module.exports = ConnectionStatusModel;
