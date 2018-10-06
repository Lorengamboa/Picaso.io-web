"use strict";

const Bucket = (data, ctx) => {
  const { drawPosition } = data;

  if (!drawPosition) return;

  const { currentX, currentY, x, y } = drawPosition;

  var imgData = ctx.getImageData(x, y, 600, 400);

  console.log(imgData.data[0])
  console.log(imgData.data[1])
  console.log(imgData.data[2])
  console.log(imgData.data[3])

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(currentX, currentY);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;

  ctx.stroke();
  ctx.closePath();
};

export default Bucket;
