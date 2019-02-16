const express = require("express");
const router = express.Router();

// load modules
const invitations = require("../../modules/invitations");
const users = require("../../modules/users");
const leagues = require("../../modules/leagues");

// @route POST /api/invitations/create
// @desc Create invitations for league or team
// @access Public
router.post("/create", (req, res) => {
  console.log("Create invitation");
  res.json({
    success: false,
    message: "This route isn't complete yet"
  });
});

// @route GET /api/invitations/user
// @desc Load invitations for the logged in user
// @access Public
router.get("/user", async (req, res) => {
  const userId = req.decoded.id;
  let userData = await users.loadUser(userId);
  let foundInvitations = await invitations.loadInvitationsForUser(userData.user.email);
  if (foundInvitations.success) {
    res.json({
      success: true,
      myInvitations: foundInvitations.myInvitations
    });
  } else {
    res.json({
      success: false,
      message: "Error loading invitations"
    });
  }
});

// @route PUT /api/invitations/:inviteId
// @desc Updates an invitation
// @access Public
router.put("/:inviteId", async (req, res) => {
  const inviteId = req.params.inviteId;
  const userId = req.decoded.id;
  const accepted = req.body.accepted;
  const leagueId = req.body.leagueId;
  let updatedLeague = {};
  // add user to league
  if (accepted) {
    updatedLeague = await leagues.addUserToLeague(leagueId, userId);
  }
  // update invitation
  if (accepted && updatedLeague.success) {
    let updatedInvitation = await invitations.respondToInvitation(inviteId, accepted);
    if (updatedInvitation.success) {
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false,
        message: "Error updating invitation"
      });
    }
  } else {
    res.json({
      success: false,
      message: "Error updating league"
    });
  }
});

module.exports = router;