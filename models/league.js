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
    ref: "GameDefinition"
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  commissioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

module.exports = League = mongoose.model("leagues", LeagueSchema);