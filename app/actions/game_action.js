'use strict';

export const UPDATE_CANVAS = 'updateCanvas';

/**
 * 
 * @param {*} data 
 */
export function updateCanvas(data) {
  return {
    type: UPDATE_CANVAS,
    payload: data
  }
}


