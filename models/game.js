const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams"
  }],
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams"
  },
  loser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams"
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seasons"
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leagues"
  },
  winner_score: {
    type: Number
  },
  loser_score: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  game_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Game = mongoose.model("games", GameSchema);