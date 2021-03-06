const express = require("express");

const router = express.Router();

// load modules
const invitations = require("../../modules/invitations");
const users = require("../../modules/users");
const leagues = require("../../modules/leagues");

// @route POST /api/invitations/create
// @desc Create invitations for league or team
// @access Public
router.post("/create", async (req, res) => {
  const userId = req.decoded.id;
  const inviteResult = await invitations.createInvitations(req.body.type, req.body.groupId, req.body.emails, userId);
  if (inviteResult.success) {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: "Error creating invitations",
    });
  }
});


// @route GET /api/invitations/user
// @desc Load invitations for the logged in user
// @access Public
router.get("/user", async (req, res) => {
  const userId = req.decoded.id;
  const userData = await users.loadUser(userId);
  const foundInvitations = await invitations.loadInvitationsForUser(userData.user.email);
  if (foundInvitations.success) {
    res.json({
      success: true,
      myInvitations: foundInvitations.myInvitations,
    });
  } else {
    res.json({
      success: false,
      message: "Error loading invitations",
    });
  }
});

// @route GET /api/invitations/league/:leagueId
// @desc Load invitations for the specified league
// @access Public
router.get("/league/:leagueId", async (req, res) => {
  const { leagueId } = req.params;
  const userId = req.decoded.id;
  const memberCheck = await leagues.checkUserMemberOfLeague(leagueId, userId);
  if (memberCheck.success) {
    if (memberCheck.userIsMember) {
      // load invitations
      const foundInvitations = await invitations.loadInvitationsForLeague(leagueId);
      if (foundInvitations.success) {
        res.json({
          success: true,
          leagueInvitations: foundInvitations.leagueInvitations,
        });
      } else {
        res.json({
          success: false,
          message: "Error loading league invitations",
        });
      }
    } else {
      res.json({
        success: false,
        message: "User isn't a member of that league",
      });
    }
  } else {
    res.json({
      success: false,
      message: "Error checking league membership",
    });
  }
});

// @route PUT /api/invitations/:inviteId
// @desc Updates an invitation
// @access Public
router.put("/:inviteId", async (req, res) => {
  const { inviteId } = req.params;
  const userId = req.decoded.id;
  const { accepted, leagueId } = req.body;
  let updatedLeague = {};
  // add user to league
  if (accepted) {
    updatedLeague = await leagues.addUserToLeague(leagueId, userId);
  }
  // update invitation
  if (!accepted || updatedLeague.success) {
    const updatedInvitation = await invitations.respondToInvitation(inviteId, accepted);
    if (updatedInvitation.success) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
        message: "Error updating invitation",
      });
    }
  } else {
    res.json({
      success: false,
      message: "Error updating league",
    });
  }
});

module.exports = router;
