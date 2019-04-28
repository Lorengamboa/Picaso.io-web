'use strict';

import * as ACTIONS from './actions';

export function retrieveGameInfo(data) {
  return {
    type: ACTIONS.RETRIEVE_GAME_INFO,
    payload: data,
  };
}

/**
 * Updates the canvas
 * @param {*} data
 */
export function updateCanvas(data) {
  return {
    type: ACTIONS.UPDATE_CANVAS,
    payload: data,
  };
}

/**
 * 
 * @param {*} data 
 */
export function displayWinners(winnerList) {
  return {
    type: ACTIONS.DISPLAY_WINNER_LIST,
    payload: winnerList,
  };
}


/**
 * 
 * @param {*} data 
 */
export function updateTimer(data) {
  return {
    type: ACTIONS.UPDATE_TIMER,
    payload: data
  }
}

/**
 * 
 * @param {*} data 
 */
export function updateRoundCounter(data) {
  return {
    type: ACTIONS.UPDATE_ROUND_COUNTER,
    payload: data
  }
}

/**
 * 
 * @param {*} data 
 */
export function updateGameState(data) {
  return {
    type: ACTIONS.UPDATE_GAME_STATE,
    payload: data
  }
}

/**
 * 
 */
export function displayCurrentWord(data) {
  return {
    type: ACTIONS.DISPLAY_CURRENT_WORD,
    payload: data
  }
}

/**
 * 
 * @param {*} data 
 */
export function fetchPlayersDraw(data) {
  return {
    type: ACTIONS.DISPLAY_PLAYERS_DRAW,
    payload: data
  }
}

/**
 * Sets the color tool pencil
 * @param {*} data
 */
export function setColorPicked(color) {
  return {
    type: ACTIONS.CHANGE_COLOR_PICKED,
    payload: color,
  };
}

/**
 * Selects a tool
 * @param {string} data
 */
export function selectTool(tool) {
  return {
    type: ACTIONS.SELECT_TOOL_PICKED,
    payload: tool,
  };
}

/**
 * Selects a pen width from a width range
 * @param {Number} data
 */
export function setPenSize(size) {
  return {
    type: ACTIONS.SELECT_PEN_SIZE,
    payload: size,
  };
}

/**
 * 
 * @param {*} playerList 
 */
export function updatePlayerList(playerList) {
  return {
    type: ACTIONS.UPDATE_USERLIST,
    payload: playerList,
  };
}

/**
 * 
 * @param {*} message 
 */
export function addMessageToChat(message) {
  return {
    type: ACTIONS.ADD_NEW_CHAT_MESSAGE,
    payload: message,
  };
}

/**
 * 
 * @param {*} message 
 */
export function playerSendMessage(message) {
  return {
    type: ACTIONS.PLAYER_SEND_MESSAGE,
    payload: message,
  };
}

/**
 * 
 * @param {*} message 
 */
export function playerDrawCanvas(data) {
  return {
    type: ACTIONS.PLAYER_DRAW_CANVAS,
    payload: data,
  };
}

/**
 * 
 * @param {*} message 
 */
export function clearCanvas() {
  return {
    type: ACTIONS.PLAYER_CLEAR_CANVAS,
    payload: { toolPicked: "bin" }
  };
}

/**
 * 
 * @param {*} draw 
 * @param {*} feedback 
 */
export function voteDraw(draw, feedback) {
  return {
    type: ACTIONS.PLAYER_VOTE_DRAW,
    payload: { draw, feedback }
  };
}

/**
 * 
 */
export function toggleExpand() {
  return {
    type: ACTIONS.TOGGLE_EXPAND,
  };
}

/**
 * 
 */
export function hideModal() {
  return {
    type: ACTIONS.HIDE_MODAL,
    payload: false
  };
}


