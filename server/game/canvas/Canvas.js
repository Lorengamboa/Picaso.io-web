'use strict';

const { createCanvas } = require('canvas');

const CANVAS_CONFIG = require('../config/canvas');

/**
 * Class Canvas
 */
class Canvas {
    constructor() {
        this.canvas = createCanvas(CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT);
    }

    /**
     * 
     */
    getContext() {
        return this.canvas.getContext('2d');
    }

    /**
     * 
     * @param {*} data 
     */
    drawLine(data) {
        const { drawPosition, colorPicked, toolPicked } = data;
        const ctx = this.getContext();

        const { width, height } = this.canvas;

        if (toolPicked === 'bin') {
            ctx.clearRect(0, 0, width, height);
            return;
        }

        const { currentX, currentY, x, y } = drawPosition;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(currentX, currentY);
        if (toolPicked === 'eraser') {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
        } else {
            ctx.strokeStyle = colorPicked;
            ctx.lineWidth = 2;
        }
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * 
     */
    getImageData() {
        return this.canvas.toDataURL();
    }
}

module.exports = Canvas;