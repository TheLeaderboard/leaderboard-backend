const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const GameDefinitionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  default_team_size: {
    type: Number,
    required: true
  },
  default_win_loss_only: {
    type: Boolean,
    required: true
  }
});

module.exports = GameDefinition = mongoose.model("game_definitions", GameDefinitionSchema);