'use strict';

/**
 * 
 */
const resizeCanvas = function () {
    const canvas = this.refs.canvas;
    var ctx = canvas.getContext("2d");

    const dataURL = canvas.toDataURL();

    const { offsetHeight, offsetWidth } = canvas.parentElement;
    canvas.width = 600;
    canvas.height = 400;

    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
    };
    image.src = dataURL;
}

module.exports = resizeCanvas;