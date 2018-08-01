"use strict";

const { createCanvas } = require("canvas");
const { PencilTool, EraserTool, BinRecycler } = require("./tools");

const CANVAS_CONFIG = require("../config/canvas");

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
    return this.canvas.getContext("2d");
  }

  /**
   *
   */
  cleanCanvas() {
    const { width, height } = this.canvas;
    const ctx = this.getContext();

    ctx.clearRect(0, 0, width, height);
  }

  /**
   *
   * @param {*} data
   */
  draw(data) {
    const { toolPicked } = data;
    const ctx = this.getContext();

    if (toolPicked === "pencil")
      PencilTool.classic(data, ctx);
    else if (toolPicked === "eraser")
      EraserTool(data, ctx);
    else if (toolPicked === "bin") BinRecycler(canvas);
  }

  /**
   *
   */
  getImageData() {
    return this.canvas.toDataURL();
  }
}

module.exports = Canvas;
