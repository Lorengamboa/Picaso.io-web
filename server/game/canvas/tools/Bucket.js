const { color_to_rgba } = require("../../../utils");

const Bucket = (data, graphics) => {
  const { coordinates, colorPicked } = data;
  const { currentX, currentY } = coordinates;

  const color = color_to_rgba(colorPicked);
  graphics.floodFill(Math.floor(currentX), Math.floor(currentY), color);
};

module.exports = Bucket;
