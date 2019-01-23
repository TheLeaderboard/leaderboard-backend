const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  commissioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = League = mongoose.model("leagues", LeagueSchema);