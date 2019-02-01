"use strict";

const Pencil = {
  classic: (data, canvas) => {
    const ctx = canvas.getContext("2d");
    const { drawPosition, colorPicked } = data;
    if (!drawPosition) return;

    let { currentX, currentY, prevX, prevY } = drawPosition;
    
    currentX = currentX / (600 / canvas.width);
    currentY = currentY / (400 / canvas.height);
    prevX = prevX / (600 / canvas.width);
    prevY = prevY / (400 / canvas.height);

    ctx.beginPath();
    ctx.moveTo(prevX, prevY, currentX, currentY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = colorPicked;
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();
  }
};

export default Pencil;