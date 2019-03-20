"use strict";

const Canvas = require("canvas");
const _ = require("lodash");

const floodFill = require("../../../Shared/floodFill");
const { PencilTool, EraserTool, BinRecycler, Bucket } = require("../../../shared/tools");

const CANVAS_CONFIG = require("../config/canvas");

Canvas.Context2d.prototype.floodFill = floodFill; // implementing floodfill extension

/**
 * Class Canvas
 */
class CanvasArea {
  constructor() {
    this.version = 1.0;
    this.canvas = Canvas.createCanvas(CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT);
    this.blank = Canvas.createCanvas(CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT); // TODO: TRY CLONE
    this.moves = [];
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

  addMove(move) {
    this.moves.push(move);
  }

  /**
   * Makes draw action over the canvas
   * @param {*} data
   */
  draw(data) {
    const { toolPicked } = data;
    const ctx = this.getContext();
    if (toolPicked === "pencil") {
      const move = PencilTool.classic.call(this, data, ctx);
      this.addMove(move);
    }
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

  /**
   * Checks if the actual canvas is blank
   */
  isBlank() {
    return this.canvas.toDataURL() == this.blank.toDataURL();
  }
}

module.exports = CanvasArea;
