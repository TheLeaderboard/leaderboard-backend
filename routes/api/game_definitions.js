const express = require("express");

const router = express.Router();

// load game definition model model
const GameDefinition = require("../../models/game_definition");

// @route GET /api/gameDefinitions/
// @desc Get all game definitions
// @access Public
router.get("/", (req, res) => {
  // load all game types from database
  GameDefinition.find({})
    .then((gameDefs) => {
      res.json({
        success: true,
        game_definitions: gameDefs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: "Couldn't load game definitions",
      });
    });
});

module.exports = router;
