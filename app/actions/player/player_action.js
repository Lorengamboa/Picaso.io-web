'use strict';

import { CHANGE_USERNAME, SOCKET_CONNECTION } from './actions';

/**
 * Sets the username value
 * @param {String} username 
 */
export function setUsername(username) {
  return {
    type: CHANGE_USERNAME,
    payload: username
  };
}

/**
 * Opens a socket conn for the player
 * @param {Object} socket 
 */
export function openPlayerSocketConnection() {
  return {
    type: SOCKET_CONNECTION,
    payload: false
  };
}


