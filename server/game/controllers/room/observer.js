const { changeGamePlay } = require("../../room/services");
const { GAME_STATE } = require("../../config/constants");
const GAME_CONFIG = require("../../config/room");
const EVENTS = require("./events");

/**
 * Attaches event listeners to the room instance
 * @param {*} game
 */
function attachEvents(game) {
  //
  game.on(EVENTS.STARTING, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.STARTING,
      GAME_CONFIG.TIME_STARTING_COUNTDOWN,
      game.play
    );
  });
  //
  game.on(EVENTS.PLAYING, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.PLAYING,
      GAME_CONFIG.TIME_PLAYING_COUNTDOWN,
      game.vote
    );
  });
  //
  game.on(EVENTS.VOTE, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.VOTING,
      GAME_CONFIG.TIME_VOTING_COUNTDOWN,
      game.play
    );
  });
}

module.exports = attachEvents;
