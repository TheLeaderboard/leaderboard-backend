const express = require("express");
const router = express.Router();

// load modules
const teams = require("../../modules/teams");
const leagues = require("../../modules/leagues");

// @route GET /api/teams/league/:leagueId
// @desc Load teams for the specified league
// @access Public
router.get("/league/:leagueId", async (req, res) => {
  const leagueId = req.params.leagueId;
  const userId = req.decoded.id;
  let memberCheckResult = await leagues.checkUserMemberOfLeague(leagueId, userId);
  if (memberCheckResult.success) {
    if (memberCheckResult.userIsMember) {
      let loadTeamResult = await teams.loadLeagueTeams(leagueId);
      if (loadTeamResult.success) {
        res.json({
          success: true,
          leagueTeams: loadTeamResult.teams
        });
      } else {
        res.json({
          success: false,
          message: "Error loading league teams"
        });
      }
    } else {
      res.json({
        success: false,
        message: "User isn't a member of that league"
      });
    }
  } else {
    res.json({
      success: false,
      message: "Error checking league membership"
    });
  }
});

module.exports = router;