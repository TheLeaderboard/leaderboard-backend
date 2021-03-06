const mongoose = require("mongoose");

const { Schema } = mongoose;

// create schema
const SeasonSchema = new Schema({
  created_date: {
    type: Date,
    default: Date.now,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  unbounded_season: {
    type: Boolean,
  },
});

const Season = mongoose.model("seasons", SeasonSchema);

module.exports = Season;
