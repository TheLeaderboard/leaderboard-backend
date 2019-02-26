// load game model
const Game = require("../models/game");

// load other modules
const teams = require("./teams");
const users = require("./users");

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
    if (gameData.team_size == 1) {
      // load teams
      newGame.home_user = newGame.home_team;
      newGame.away_user = newGame.away_team;
      let userHomeResult = await teams.loadTeamByName(newGame.home_team);
      let userAwayResult = await teams.loadTeamByName(newGame.away_team);
      let userHome = userHomeResult.team;
      let userAway = userAwayResult.team;
      newGame.teams = [userHome._id, userAway._id];
      if (gameData.home_team == gameData.selected_winner) {
        newGame.winner = userHome._id;
        newGame.loser = userAway._id;
      } else {
        newGame.winner = userAway._id;
        newGame.loser = userHome._id;
      }
      newGame.home_team = userHome._id;
      newGame.away_team = userAway._id;
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

module.exports.loadLeagueGames = async function(leagueId) {
  try {
    let foundGames = await Game.find({ league: leagueId })
      .populate("home_team", "members name")
      .populate("away_team", "members name")
      .populate("home_user", "username name")
      .populate("away_user", "username name")
      .exec();
    // sort games
    foundGames.sort((a, b) => {
      return b.game_date - a.game_date;
    });
    return {
      success: true,
      games: foundGames
    }
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading games"
    };
  }
}