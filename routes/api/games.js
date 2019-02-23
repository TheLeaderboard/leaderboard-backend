const express = require("express");
const router = express.Router();

// load modules
const games = require("../../modules/games");

// @route POST /api/games/create
// @desc Create new game
// @access Public
router.post("/create", async (req, res) => {
  const gameData = req.body;
  const userId = req.decoded.id;
  let gameResult = await games.createGame(gameData, userId);
  if (gameResult.success) {
    res.json({
      success: true
    });
  } else {
    res.json({
      success: false,
      message: gameResult.message
    });
  }
});

module.exports = router;