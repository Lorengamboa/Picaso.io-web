"use strict";

const colors = require("../colors");

const Pencil = {
  classic: (data, ctx) => {
    const { coordinates, colorPicked } = data;
    if (!coordinates || !functionvalidateColor(colorPicked)) return;

    const { currentX, currentY, prevX, prevY } = coordinates;
    
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = colorPicked;
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();

    const move = {
      tool: "pencil",
      color: colorPicked,
      coordinates,
    };

    return move;
  }
};

function functionvalidateColor(color) {
  return colors.includes(color);
}

module.exports = Pencil;