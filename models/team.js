const mongoose = require("mongoose");

const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true,
  }],
  created_date: {
    type: Date,
    default: Date.now,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  default_user_team: {
    type: Boolean,
    default: false,
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leagues",
    sparse: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Team = mongoose.model("teams", TeamSchema);
