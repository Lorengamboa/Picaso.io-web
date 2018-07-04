'use strict';

import io from 'socket.io-client';
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
  var host = window.location.protocol + "//" + window.location.host;
  const socket = io(host);
 console.log("PANA 2");
  return {
    type: SOCKET_CONNECTION,
    payload: socket
  };
}


