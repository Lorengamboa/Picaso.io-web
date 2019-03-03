const { changeGamePlay } = require("./services");
const { GAME_STATE } = require("../config/constants");
const GAME_CONFIG = require("../config/room");
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
  game.on(EVENTS.VOTE, () => {
    changeGamePlay.call(
      game,
      GAME_STATE.VOTING,
      GAME_CONFIG.TIME_VOTING_COUNTDOWN,
      game.play
    );
  });
  // PAUSE GAME!
  game.on(EVENTS.PAUSE, () => {
    game.timer.clearInterval();
    game.status = GAME_STATE.PAUSED;
  });
  // FINISH GAME!
  game.on(EVENTS.FINISH, () => {
    game.timer.clearInterval();
    game.status = GAME_STATE.FINISHED;
    game.updateGameState();
  });
}


module.exports = attachEvents;
