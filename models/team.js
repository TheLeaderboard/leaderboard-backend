const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
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
  }
});

module.exports = Team = mongoose.model("teams", TeamSchema);