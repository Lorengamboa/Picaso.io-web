'use strict';

const { createCanvas, loadImage } = require('canvas');

/**
 * Class Canvas
 */
class Canvas {
    constructor() {
        this.canvas = createCanvas(800, 600)
        this.ctx = this.canvas.getContext('2d')
    }

    /**
     * 
     * @param {*} data 
     */
    drawLine(data) {
        const { drawPosition, colorPicked, toolPicked } = data;

        const { currentX, currentY, x, y } = drawPosition;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(currentX, currentY);
        if (toolPicked === 'eraser') {
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 5;
        } else {
            this.ctx.strokeStyle = colorPicked;
            this.ctx.lineWidth = 2;
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * 
     */
    getImageData() {
        return this.canvas.toDataURL();
    }
}

module.exports = Canvas;