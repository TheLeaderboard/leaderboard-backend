const express = require("express");
const router = express.Router();

// load modules
const invitations = require("../../modules/invitations");
const seasons = require("../../modules/seasons");
const leagues = require("../../modules/leagues");
const gameDefinitions = require("../../modules/game_definitions");

// load league model
const League = require("../../models/league");

// @route POST /api/leagues/create
// @desc Create new league
// @access Public
router.post("/create", async (req, res) => {
  const userId = req.decoded.id;
  const name = req.body.name;
  const game_type = req.body.gameType
  try {
    let seasonResult = await seasons.createSeason(true);
    let gameDefResult = await gameDefinitions.loadGameDefinition(game_type);
    let leagueResult = await leagues.createLeague(name, game_type, userId, seasonResult.season_id, gameDefResult.game_definition.default_team_size);
    await invitations.createInvitations("league", leagueResult.createdLeague._id, req.body.invitedEmails, userId);
    res.json({
      success: true,
      league: leagueResult.createdLeague
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
    let foundLeague = await League.findById(leagueId).populate("game_type").populate("members", "name username _id email").exec();
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