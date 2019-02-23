// load game model
const Game = require("../models/game");

module.exports.createGame = async function(gameData, userId) {
  try {
    const newGame = new Game({
      league: gameData.league,
      created_by: userId,
      teams: [gameData.home_team, gameData.away_team],
      win_loss: gameData.win_loss_only,
      team_size: Number(gameData.team_size),
      season: gameData.season,
      home_team: gameData.home_team,
      away_team: gameData.away_team
    });
    if (gameData.win_loss_only) {
      newGame.winner = gameData.selected_winner
      newGame.loser = gameData.home_team === gameData.selectedWinner ? gameData.away_team : gameData.home_team;
    } else {
      // calculate winner based on scores
      if (Number(gameData.home_score) >= Number(gameData.away_score)) {
        // home team won
        newGame.winner = gameData.home_team;
        newGame.loser = gameData.away_team;
        newGame.winner_score = Number(gameData.home_score);
        newGame.loser_score = Number(gameData.away_score);
      } else {
        newGame.winner = gameData.away_team;
        newGame.loser = gameData.home_team;
        newGame.winner_score = Number(gameData.away_score);
        newGame.loser_score = Number(gameData.home_score);
      }
    }
    await newGame.save();
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