'use strict';

const Timer = require("./Timer");
const Canvas = require("../canvas");

module.exports = {
    /**
     * 
     */
    changeGamePlay: function (gameState, time, gameStateFn) {
        this.gamePlay = gameState;
        this.updateGameState();
        Timer.startCountdown.call(this, time, gameStateFn);
    },
    /**
     * 
     */
    createNewCanvas: function (id) {
        const newCanvas = new Canvas();
        return {
            id,
            canvas: newCanvas
        }
    }
}