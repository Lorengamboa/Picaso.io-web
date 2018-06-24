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
  var host = window.location.protocol + "//" + window.location.host;
  const socket = openSocket(host);

  return {
    type: SOCKET_CONNECTION,
    payload: socket
  }
}


