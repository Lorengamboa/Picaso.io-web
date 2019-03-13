"use strict";

import { scalePositionHeight, scalePositionX } from '../../../utils';

/**
 * 
 * @param {*} data 
 * @param {*} canvas 
 */
const Bucket = (data, canvas) => {
  const ctx = canvas.getContext("2d");

  const { colorPicked, coordinates } = data;

  let { prevX, prevY } = coordinates;

  prevX = scalePositionX(prevX, canvas.width);
  prevY = scalePositionHeight(prevY, canvas.height);

  ctx.floodFill(prevX, prevY, colorPicked);
};

export default Bucket;
