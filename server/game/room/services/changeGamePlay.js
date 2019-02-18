'use strict';

/**
 * 
 * @param {*} gameState 
 * @param {*} time 
 * @param {*} gameStateFn 
 */
const changeGamePlay = function (gameState, time, action) {
    // if(!action) this.timer.clearInterval();
    this.gamePlay = gameState;
    this.updateGameState();
    this.timer.startCountdown.call(this, time, action);
}

module.exports = changeGamePlay;
