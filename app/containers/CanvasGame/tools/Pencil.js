"use strict";

import { scalePositionHeight, scalePositionX } from '../../../utils';

const Pencil = {
  classic: (data, canvas) => {
    const ctx = canvas.getContext("2d");
    const { coordinates, colorPicked } = data;
    if (!coordinates) return;

    let { currentX, currentY, prevX, prevY } = coordinates;
    
    currentX = !currentX ? prevX + 1 : currentX;
    currentY = !currentY ? prevY + 1 : currentY;

    currentX = scalePositionX(currentX, canvas.width);
    currentY = scalePositionHeight(currentY, canvas.height);
    prevX = scalePositionX(prevX, canvas.width);
    prevY = scalePositionHeight(prevY, canvas.height);

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = colorPicked;
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();
  }
};

export default Pencil;