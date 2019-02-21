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
/**
 * @param  {String} leagueId
 * @param  {String} userId
 */
module.exports.checkUserMemberOfLeague = async function(leagueId, userId) {
  try {
    let foundLeague = await League.findById(leagueId);
    if (foundLeague.members.indexOf(userId) > -1) {
      return {
        success: true,
        userIsMember: true
      };
    } else {
      return {
        success: true,
        userIsMember: false
      };
    }
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading league"
    };
  }
}

module.exports.createLeague = async function(name, game_type, userId, default_season, team_size, win_loss_only) {
  try {
    const newLeague = new League({
      name: name,
      game_type: game_type,
      commissioner: userId,
      default_season: default_season,
      team_size: team_size,
      win_loss_only: win_loss_only
    });
    newLeague.members.push(userId);
    let createdLeague = await newLeague.save();
    return {
      success: true,
      createdLeague: createdLeague
    }
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading league"
    };
  }
}