'use strict';

export const UPDATE_CANVAS = 'updateCanvas';
export const CHANGE_COLOR_PICKED = 'changeColorPicker';
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

/**
 * 
 * @param {*} data 
 */
export function setColorPicked(color) {
  return {
    type: CHANGE_COLOR_PICKED,
    payload: color
  }
}

