const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const GameDefinitionSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = GameDefinition = mongoose.model("game_definitions", GameDefinitionSchema);