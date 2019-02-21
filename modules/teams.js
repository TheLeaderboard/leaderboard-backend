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
    console.log(createdTeam);
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