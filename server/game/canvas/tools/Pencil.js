"use strict";

const Pencil = {
  classic: (data, ctx) => {
    const { drawPosition, colorPicked } = data;
    if (!drawPosition) return;

    const { currentX, currentY, x, y } = drawPosition;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = colorPicked;
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();
  }
};

module.exports = Pencil;