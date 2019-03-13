const { changeGamePlay } = require("../services");
const GAME_CONFIG = require("../../config/room");
const { GAME_STATE } = require("../../config/constants");
const EVENTS = require("./events");

/**
 * Attaches event listeners to the room instance
 * @param {*} game
 */
function attachEvents(game) {
  // GAME ABOUT TO START!
  game.on(EVENTS.STARTING, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.STARTING,
      GAME_CONFIG.TIME_STARTING_COUNTDOWN,
      game.play
    );
  });
  // START PLAYING!
  game.on(EVENTS.PLAYING, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.PLAYING,
      GAME_CONFIG.TIME_PLAYING_COUNTDOWN,
      game.vote
    );
  });
  // START VOTING!
  game.on(EVENTS.VOTING, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.VOTING,
      GAME_CONFIG.TIME_VOTING_COUNTDOWN,
      game.presentate
    );
  });
  //
  game.on(EVENTS.PRESENTATE, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.PRESENTATING,
      GAME_CONFIG.TIME_PRESENTANTE_COUNTDOWN,
      game.play
    );
  });
  // PAUSE GAME!
  game.on(EVENTS.PAUSED, () => {
    game.timer.clearInterval();
    game.status = GAME_STATE.PAUSED;
  });
  // FINISH GAME!
  game.on(EVENTS.FINISHED, () => {
    game.timer.clearInterval();
    game.status = GAME_STATE.FINISHED;
    game.updateGameState();
  });
}


module.exports = attachEvents;
