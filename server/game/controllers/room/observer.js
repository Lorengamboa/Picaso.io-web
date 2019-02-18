const { changeGamePlay } = require("../../room/services");
const { GAME_STATE } = require("../../config/constants");
const GAME_CONFIG = require("../../config/room");
const EVENTS = require("./events");

/**
 * Attaches event listeners to the room instance
 * @param {*} game 
 */
function attachEvents(game) {
  game.on(EVENTS.ENOUGH_PLAYERS, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.STARTING,
      GAME_CONFIG.TIME_STARTING_COUNTDOWN,
      game.start
    );
  });

  game.on(EVENTS.NOT_ENOUGH_PLAYERS, () => {
    console.log("enough players");
  });

  game.on(EVENTS.EMPTY_ROOM, () => {
    console.log("enough players");
  });
}

module.exports = attachEvents;
