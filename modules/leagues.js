// load league model
const League = require("../models/league");

module.exports.addUserToLeague = async function addUserToLeague(leagueId, userId) {
  try {
    const data = { members: userId };
    const updatedLeague = await League.findByIdAndUpdate(leagueId, { $push: data }).exec();
    return {
      success: true,
      updatedLeague,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error updating league",
    };
  }
};

/**
 * @param  {String} leagueId
 * @param  {String} userId
 */
module.exports.checkUserMemberOfLeague = async function checkUserMemberOfLeague(leagueId, userId) {
  try {
    const foundLeague = await League.findById(leagueId);
    if (foundLeague.members.indexOf(userId) > -1) {
      return {
        success: true,
        userIsMember: true,
      };
    }
    // user isn't a member of the league
    return {
      success: true,
      userIsMember: false,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading league",
    };
  }
};

module.exports.createLeague = async function createLeague(name, gameType, userId, defaultSeason, teamSize, winLossOnly) {
  try {
    const newLeague = new League({
      name,
      game_type: gameType,
      commissioner: userId,
      default_season: defaultSeason,
      team_size: teamSize,
      win_loss_only: winLossOnly,
    });
    newLeague.members.push(userId);
    const createdLeague = await newLeague.save();
    return {
      success: true,
      createdLeague,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading league",
    };
  }
};
