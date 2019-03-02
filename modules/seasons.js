// load season model
const Season = require("../models/season");

module.exports.createSeason = async function createSeason(unbounded, startDate, endDate) {
  try {
    const newSeason = new Season({
      unbounded_season: unbounded,
    });
    if (!unbounded) {
      newSeason.start_date = startDate;
      newSeason.end_date = endDate;
    }
    const createdSeason = await newSeason.save();
    return {
      success: true,
      season_id: createdSeason._id,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating season",
    };
  }
};
