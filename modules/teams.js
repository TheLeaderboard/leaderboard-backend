const Team = require("../models/team");

module.exports.createUserTeam = async function(userId) {
  try {
    const newTeam = new Team({
      name: userId,
      members: [userId],
      captian: userId,
      default_user_team: true
    });
    let createdTeam = await newTeam.save();
    return {
      success: true,
      userTeam: createdTeam
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating user team"
    };
  }
}

module.exports.createTeam = async function(name, members, leagueId, userId) {
  try {
    const newTeam = new Team({
      name: name,
      members: members,
      league: leagueId,
      created_by: userId
    });
    let createdTeam = await newTeam.save();
    return {
      success: true,
      team: createdTeam
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating team"
    };
  }
}

module.exports.loadLeagueTeams = async function(leagueId) {
  try {
    let foundTeams = await Team.find({ league: leagueId}).exec();
    console.log(foundTeams);
    return {
      success: true,
      teams: foundTeams
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading league teams"
    };
  }
}