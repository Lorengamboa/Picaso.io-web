"use strict";

import * as ACTIONS from "./actions";

/**
 * Sets the username value
 * @param {String} username
 */
export function setUsername(username) {
  return {
    type: ACTIONS.CHANGE_USERNAME,
    payload: username
  };
}

/**
 *
 * @param {*} settings
 */
export function createRoom(settings) {
  return {
    type: ACTIONS.CREATE_ROOM,
    payload: settings
  };
}

/**
 * Opens a socket conn for the player
 */
export function openPlayerSocketConnection() {
  return {
    type: ACTIONS.SOCKET_CONNECTION,
    payload: false
  };
}

/**
 * Join private game
 * @param {*} id
 */
export function joinPrivateGame(id) {
  return {
    type: ACTIONS.CONNECT_PRIVATE_ROOM,
    payload: id
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

v