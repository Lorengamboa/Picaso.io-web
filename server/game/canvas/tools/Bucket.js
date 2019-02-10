"use strict";

const Bucket = (data, graphics) => {
    const { coordinates, colorPicked } = data;
    const { currentX, currentY } = coordinates;

    graphics.fillStyle = colorPicked;
    graphics.floodFill(currentX, currentY, 0);
};

module.exports = Bucket;
