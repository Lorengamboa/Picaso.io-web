"use strict";

const Canvas = require("canvas");
const { PencilTool, EraserTool, BinRecycler, Bucket } = require("./tools");

const CANVAS_CONFIG = require("../config/canvas");

/**
 * Class Canvas
 */
class CanvasArea {
  constructor() {
    this.canvas = Canvas.createCanvas(CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT);
  }

  /**
   * Returns the canvas's context
   */
  getContext() {
    return this.canvas.getContext("2d");
  }

  /**
   * Clears the whole canvas
   */
  cleanCanvas() {
    const { width, height } = this.canvas;
    const ctx = this.getContext();

    ctx.clearRect(0, 0, width, height);
  }

  /**
   * Makes draw action over the canvas
   * @param {*} data
   */
  draw(data) {
    const { toolPicked } = data;
    const ctx = this.getContext();

    if (toolPicked === "pencil")
      PencilTool.classic(data, ctx);
    if (toolPicked === "bucket")
      Bucket(data, ctx);
    else if (toolPicked === "eraser")
      EraserTool(data, ctx);
    else if (toolPicked === "bin") BinRecycler(this.canvas);
  }

  /**
   * Returns the canvas image data in base64 format
   */
  getImageData() {
    const dataURL = this.canvas.toDataURL();

    return dataURL;
  }
}

module.exports = CanvasArea;
