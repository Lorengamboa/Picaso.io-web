'use strict';

/**
 * 
 * @param {*} gameState 
 * @param {*} time 
 * @param {*} gameStateFn 
 */
const changeGamePlay = function (gameStatus, time, action) {
    // if(!action) this.timer.clearInterval();
    this.status = gameStatus;
    this.updateGameState();
    this.timer.startCountdown.call(this, time, action);
}

module.exports = changeGamePlay;
