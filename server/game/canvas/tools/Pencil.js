"use strict";

const PencilModel = {

};

const Pencil = {
  classic: (data, ctx) => {
    const { drawPosition, colorPicked } = data;
    if (!drawPosition) return;

    const { currentX, currentY, prevX, prevY } = drawPosition;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = colorPicked;
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();
  }
};

module.exports = Pencil;