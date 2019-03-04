"use strict";

import * as ACTIONS from "./actions";

/**
 * Opens a socket conn for the player
 */
export function openPlayerSocketConnection() {
  return {
    type: ACTIONS.SOCKET_CONNECTION,
  };
}

/**
 * 
 * @param {*} result 
 */
export function setConnection(result) {
  return {
    type: ACTIONS.SET_CONNECTION,
    payload: result
  };
}

