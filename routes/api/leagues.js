const express = require("express");
const router = express.Router();

// load league model
const League = require("../../models/league");

// @route POST /api/leagues/create
// @desc Create new league
// @access Public
router.post("/create", (req, res) => {
  const userId = req.decoded.id;
  const newLeague = new League({
    name: req.body.name,
    game_type: req.body.gameType,
    commissioner: userId
  });
  newLeague.members.push(userId);
  newLeague.save()
    .then(league => {
      res.json({
        success: true,
        league: league
      });
    })
    .catch(err => console.log(err));
});

// @route GET /api/leagues/get/:id
// @desc Get a league
// @access Public
router.get("/:id", (req, res) => {
  // update to only return leagues where the user is a member
  var id = req.params.id;
  League.findById(id)
    .then(league => {
      res.json({
        success: true,
        league: league
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        message: "Couldn't find league with that ID"
      });
    });
});

// @route GET /api/leagues/
// @desc Load all leagues for a user
// @access Public
router.get("/", (req, res) => {
  const userId = req.decoded.id;
  League.find({ members: userId })
    .then(leagues => {
      res.json({
        success: true,
        myLeagues: leagues
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        message: "Couldn't find any leagues"
      });
    });
});

module.exports = router;