'use strict';

const Timer = require("../Timer");

/**
 * 
 * @param {*} gameState 
 * @param {*} time 
 * @param {*} gameStateFn 
 */
const changeGamePlay = function (gameState, time, gameStateFn) {
    this.gamePlay = gameState;
    this.updateGameState();
    Timer().startCountdown.call(this, time, gameStateFn);
}

module.exports = changeGamePlay;
