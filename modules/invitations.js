// load invitation model
const Invitation = require("../models/invitation");

module.exports.createInvitations = async function createInvitations(type, groupId, emails, userId) {
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
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating invitations",
    };
  }
};
/**
 * @param  {String} email
 */
module.exports.loadInvitationsForUser = async function loadInvitationsForUser(email) {
  try {
    const foundInvitations = await Invitation.find({ invited_email: email, invite_status: "Created" })
      .populate("league_id", "name")
      .populate("inviting_user", "username")
      .exec();
    return {
      success: true,
      myInvitations: foundInvitations,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading invitations",
    };
  }
};
/**
 * @param  {String} leagueId
 */
module.exports.loadInvitationsForLeague = async function loadInvitationsForLeague(leagueId) {
  try {
    const foundInvitations = await Invitation.find({ league_id: leagueId, invite_status: "Created" })
      .populate("inviting_user", "username")
      .exec();
    return {
      success: true,
      leagueInvitations: foundInvitations,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading invitations",
    };
  }
};

module.exports.respondToInvitation = async function respondToInvitation(inviteId, accepted) {
  try {
    const data = {};
    if (accepted) {
      data.invite_status = "Accepted";
    } else {
      data.invite_status = "Rejected";
    }
    const updatedInvitation = await Invitation.findByIdAndUpdate(inviteId, { $set: data }).exec();
    return {
      success: true,
      updatedInvitation,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error updating invitation",
    };
  }
};
