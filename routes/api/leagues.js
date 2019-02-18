const express = require("express");
const router = express.Router();

// load invitations module
const invitations = require("../../modules/invitations");

// load league model
const League = require("../../models/league");

// @route POST /api/leagues/create
// @desc Create new league
// @access Public
router.post("/create", async (req, res) => {
  const userId = req.decoded.id;
  const newLeague = new League({
    name: req.body.name,
    game_type: req.body.gameType,
    commissioner: userId
  });
  newLeague.members.push(userId);
  try {
    let createdLeague = await newLeague.save();
    await invitations.createInvitations("league", createdLeague._id, req.body.invitedEmails, userId);
    res.json({
      success: true,
      league: createdLeague
    });
  } catch(err) {
    console.log(err);
    res.json({
      success: false,
      message: "Couldn't create league"
    });
  }
});

// @route GET /api/leagues/:id
// @desc Get a league
// @access Public
router.get("/:id", async (req, res) => {
  // update to only return leagues where the user is a member
  const leagueId = req.params.id;
  const userId = req.decoded.id;
  try {
    let foundLeague = await League.findById(leagueId).populate("game_type").populate("members").exec();
    if (foundLeague.members.indexOf(userId) > -1 || true) {
      res.json({
        success: true,
        league: foundLeague
      });
    } else {
      res.json({
        success: false,
        message: "User isn't a member of that league"
      });
    }
  } catch(err) {
    console.log(err);
    res.json({
      success: false,
      message: "Couldn't find league with that ID"
    });
  }
});

// @route GET /api/leagues/
// @desc Load all leagues for a user
// @access Public
router.get("/", async (req, res) => {
  const userId = req.decoded.id;
  try {
    let foundLeagues = await League.find({ members: userId }).exec();
    res.json({
      success: true,
      myLeagues: foundLeagues
    });
  } catch(err) {
    console.log(err);
    res.json({
      success: false,
      message: "Couldn't find any leagues"
    });
  }
});

module.exports = router;