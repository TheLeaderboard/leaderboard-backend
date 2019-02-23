// load game model
const Game = require("../models/game");

module.exports.createGame = async function(gameData, userId) {
  try {
    console.log(gameData);
    console.log(userId);
    return {
      success: true
    }
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating game"
    };
  }
}