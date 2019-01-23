'use strict';

/**
 * 
 * @param {*} gameState 
 * @param {*} time 
 * @param {*} gameStateFn 
 */
const changeGamePlay = function (gameState, time, gameStateFn) {
    this.gamePlay = gameState;
    this.updateGameState();
    this.timer.startCountdown.call(this, time, gameStateFn);
}

module.exports = changeGamePlay;
