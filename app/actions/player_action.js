'use strict';

import openSocket from 'socket.io-client';

export const CHANGE_USERNAME = 'setPlayerUsername';
export const SOCKET_CONNECTION = 'openSocketConnection';


/**
 * Sets the username value
 * @param {String} username 
 */
export function setUsername(username) {
  return {
    type: CHANGE_USERNAME,
    payload: username
  }
}

/**
 * Opens a socket conn for the player
 * @param {Object} socket 
 */
export function openPlayerSocketConnection() {
  const socket = openSocket('http://localhost:8080');

  return {
    type: SOCKET_CONNECTION,
    payload: socket
  }
}


