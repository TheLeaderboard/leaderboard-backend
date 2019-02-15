const express = require("express");
const router = express.Router();

// load invitations module
const invitations = require("../../modules/invitations");
const users = require("../../modules/users");


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

module.exports = router;