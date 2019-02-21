// load game definition model
const GameDefinition = require("../models/game_definition");

module.exports.loadGameDefinition = async function(gameDefId) {
  try {
    let foundGameDef = await GameDefinition.findById(gameDefId);
    console.log(foundGameDef);
    return {
      success: true,
      game_definition: foundGameDef
    };
  } catch(err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading game definition"
    };  
  }
}