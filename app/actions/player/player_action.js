'use strict';

import { CHANGE_USERNAME, SOCKET_CONNECTION, CONNECT_PRIVATE_ROOM } from './actions';

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
 */
export function openPlayerSocketConnection() {
  return {
    type: SOCKET_CONNECTION,
    payload: false
  };
}

/**
 * Join private game
 * @param {*} id 
 */
export function joinPrivateGame(id) {
  return {
    type: CONNECT_PRIVATE_ROOM,
    payload: id
  };
}


