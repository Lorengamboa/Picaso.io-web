'use strict';

import {
  UPDATE_CANVAS,
  CHANGE_COLOR_PICKED,
  SELECT_TOOL_PICKED,
  SELECT_PEN_WIDTH,
  UPDATE_USERLIST,
  ADD_NEW_CHAT_MESSAGE,
  PLAYER_SEND_MESSAGE,
  PLAYER_DRAW_CANVAS,
  PLAYER_CLEAR_CANVAS,
  UPDATE_TIMER,
  UPDATE_GAME_STATE,
  DISPLAY_PLAYERS_DRAW,
  DISPLAY_CURRENT_WORD
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
 * 
 * @param {*} data 
 */
export function updateTimer(data) {
  return {
    type: UPDATE_TIMER,
    payload: data
  }
}

/**
 * 
 * @param {*} data 
 */
export function updateGameState(data) {
  return {
    type: UPDATE_GAME_STATE,
    payload: data
  }
}

/**
 * 
 */
export function displayCurrentWord(data) {
  return {
    type: DISPLAY_CURRENT_WORD,
    payload: data
  }
}

/**
 * 
 * @param {*} data 
 */
export function fetchPlayersDraw(data) {
  return {
    type: DISPLAY_PLAYERS_DRAW,
    payload: data
  }
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
 * @param {*} playerList 
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

/**
 * 
 * @param {*} message 
 */
export function clearCanvas() {
  return {
    type: PLAYER_CLEAR_CANVAS,
  };
}

