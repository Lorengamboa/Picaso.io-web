'use strict';

const Canvas = require("../../canvas");

const createNewCanvas =  function (id) {
    const newCanvas = new Canvas();
    return {
        id,
        canvas: newCanvas
    }
}

module.exports = createNewCanvas;
