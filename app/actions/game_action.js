'use strict';

export const UPDATE_CANVAS = 'updateCanvas';
export const CHANGE_COLOR_PICKED = 'changeColorPicker';
export const SELECT_TOOL_PICKED = 'selectTool';
export const SELECT_PEN_WIDTH = 'setPenWidth';

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

/**
 * 
 * @param {*} data 
 */
export function selectTool(tool) {
  return {
    type: SELECT_TOOL_PICKED,
    payload: tool
  }
}

/**
 * 
 * @param {*} data 
 */
export function setPenWidth(width) {
  return {
    type: SELECT_PEN_WIDTH,
    payload: width
  }
}
