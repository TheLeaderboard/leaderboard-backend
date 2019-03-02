const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
  }],
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
  },
  loser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
  },
  home_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
  },
  away_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
  },
  home_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  away_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seasons",
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leagues",
  },
  winner_score: {
    type: Number,
  },
  loser_score: {
    type: Number,
  },
  team_size: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  game_date: {
    type: Date,
    default: Date.now,
  },
  win_loss: {
    type: Boolean,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Game = mongoose.model("games", GameSchema);
