'use strict';

const Canvas = require("../canvas");

const GameFactory =  function (id) {
    const newCanvas = new Canvas();
    return {
        id,
        canvas: newCanvas
    }
}

module.exports = GameFactory;
