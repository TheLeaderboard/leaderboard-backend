const Team = require("../models/team");

module.exports.createUserTeam = async function createUserTeam(userId) {
  try {
    const newTeam = new Team({
      name: userId,
      members: [userId],
      captian: userId,
      default_user_team: true,
    });
    const createdTeam = await newTeam.save();
    return {
      success: true,
      userTeam: createdTeam,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating user team",
    };
  }
};

module.exports.loadTeamByName = async function loadTeamByName(teamName) {
  try {
    const foundTeam = await Team.findOne({ name: teamName }).exec();
    return {
      success: true,
      team: foundTeam,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading team",
    };
  }
};

module.exports.createTeam = async function createTeam(name, members, leagueId, userId) {
  try {
    const newTeam = new Team({
      name,
      members,
      league: leagueId,
      created_by: userId,
    });
    const createdTeam = await newTeam.save();
    return {
      success: true,
      team: createdTeam,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating team",
    };
  }
};

module.exports.loadLeagueTeams = async function loadLeagueTeams(leagueId) {
  try {
    const foundTeams = await Team.find({ league: leagueId }).exec();
    return {
      success: true,
      teams: foundTeams,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading league teams",
    };
  }
};
