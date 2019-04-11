"use strict";

const Pencil = {
  classic: (data, ctx) => {
    const { coordinates, colorPicked, penWidth } = data;
    if (!coordinates) return;

    let { currentX, currentY, prevX, prevY } = coordinates;
    
    currentX = !currentX ? prevX + 1 : currentX;
    currentY = !currentY ? prevY + 1 : currentY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = colorPicked;
    ctx.lineWidth = penWidth;
    ctx.lineJoin = ctx.lineCap = 'round';

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

module.exports = Pencil;