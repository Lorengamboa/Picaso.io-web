'use strict';

import {
  UPDATE_CANVAS,
  CHANGE_COLOR_PICKED,
  SELECT_TOOL_PICKED,
  SELECT_PEN_WIDTH,
  UPDATE_USERLIST,
  ADD_NEW_CHAT_MESSAGE,
  PLAYER_SEND_MESSAGE,
  PLAYER_DRAW_CANVAS
} from './actions';

/**
 * Updates the canvas
 * @param {*} data
 */
export function updateCanvas(data) {
  return {
    type: UPDATE_CANVAS,
    payload: data,
  };
}

/**
 * Sets the color tool pencil
 * @param {*} data
 */
export function setColorPicked(color) {
  return {
    type: CHANGE_COLOR_PICKED,
    payload: color,
  };
}

/**
 * Selects a tool
 * @param {string} data
 */
export function selectTool(tool) {
  return {
    type: SELECT_TOOL_PICKED,
    payload: tool,
  };
}

/**
 * Selects a pen width from a width range
 * @param {Number} data
 */
export function setPenWidth(width) {
  return {
    type: SELECT_PEN_WIDTH,
    payload: width,
  };
}

/**
 * 
 */
export function updatePlayerList(playerList) {
  return {
    type: UPDATE_USERLIST,
    payload: playerList,
  };
}

/**
 * 
 * @param {*} message 
 */
export function addMessageToChat(message) {
  return {
    type: ADD_NEW_CHAT_MESSAGE,
    payload: message,
  };
}

/**
 * 
 * @param {*} message 
 */
export function playerSendMessage(message) {
  return {
    type: PLAYER_SEND_MESSAGE,
    payload: message,
  };
}

/**
 * 
 * @param {*} message 
 */
export function playerDrawCanvas(data) {
  return {
    type: PLAYER_DRAW_CANVAS,
    payload: data,
  };
}
