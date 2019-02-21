// load season model
const Season = require("../models/season");

module.exports.createSeason = async function(unbounded, start_date, end_date) {
  try {
    const newSeason = new Season({
      unbounded_season: unbounded
    });
    if (!unbounded) {
      newSeason.start_date = start_date;
      newSeason.end_date = end_date;
    }
    let createdSeason = await newSeason.save();
    return {
      success: true,
      season_id: createdSeason._id
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating season"
    };
  }
}