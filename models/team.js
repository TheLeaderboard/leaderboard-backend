const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true
  }],
  created_date: {
    type: Date,
    default: Date.now
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  default_user_team: {
    type: Boolean
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leagues",
    index: true
  }
});

module.exports = Team = mongoose.model("teams", TeamSchema);