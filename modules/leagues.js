// load league model
const League = require("../models/league");

module.exports.addUserToLeague = async function(leagueId, userId) {
  try {
    const data = { members: userId };
    let updatedLeague = await League.findByIdAndUpdate(leagueId, { $push: data }).exec();
    return {
      success: true,
      updatedLeague: updatedLeague
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error updating league"
    };
  }
}