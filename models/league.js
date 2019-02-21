const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  game_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "game_definitions"
  },
  team_size: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  default_season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seasons"
  },
  commissioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }]
});

module.exports = League = mongoose.model("leagues", LeagueSchema);