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
    commissioner: userId
  });
  newLeague.members.push(userId);
  newLeague.save()
    .then(league => {
      console.log(league);
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
router.get("/get/:id", (req, res) => {
  var id = req.params.id;
  League.findById(id)
    .then(league => {
      console.log(league);
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

module.exports = router;