// load invitation model
const Invitation = require("../models/invitation");

module.exports.createInvitations = async function(type, groupId, emails, userId) {
  try {
    for (const email in emails) {
      // create invitation
      const newInvitation = new Invitation({
        invite_type: type,
        inviting_user: userId,
        invited_email: emails[email],
      });
      if (type === "league") {
        newInvitation.league_id = groupId;
      } else if (type === "team") {
        newInvitation.team_id = groupId;
      }
      await newInvitation.save();
    }
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

module.exports.loadInvitationsForUser = async function(email) {
  try {
    let foundInvitations = await Invitation.find({ invitedEmail: email }).exec();
    return {
      success: true,
      myInvitations: foundInvitations
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading invitations"
    };
  }
}