'use strict';

const general_dictionary = require('../../dictionary/general_en')
const { rndValueArray } = require('../../utils')
const Timer = require("./Timer");
const Canvas = require("../canvas");

module.exports = {

    changeGamePlay: function (gameState, time, gameStateFn) {
        this.gamePlay = gameState;
        this.updateGameState();
        Timer.startCountdown.call(this, time, gameStateFn);
    },
    requestRandomWord: () => {
        const randomWord = rndValueArray(general_dictionary.nouns);
        return randomWord;
    },
    createNewCanvas: function (id) {
        const newCanvas = new Canvas();
        return {
            id,
            canvas: newCanvas
        }
    }
}