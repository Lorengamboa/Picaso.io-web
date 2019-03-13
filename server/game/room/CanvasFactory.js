'use strict';

const Canvas = require("../canvas");

const CanvasFactory =  function (id) {
    const newCanvas = new Canvas();
    return {
        id,
        canvas: newCanvas
    }
}

module.exports = CanvasFactory;
