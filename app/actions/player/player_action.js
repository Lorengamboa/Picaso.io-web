"use strict";

import {
  CREATE_ROOM,
  CHANGE_USERNAME,
  SOCKET_CONNECTION,
  CONNECT_PRIVATE_ROOM,
  SET_CONNECTION
} from "./actions";

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
 *
 * @param {*} settings
 */
export function createRoom(settings) {
  return {
    type: CREATE_ROOM,
    payload: settings
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

/**
 * 
 * @param {*} result 
 */
export function setConnection(result) {
  console.log("set connect",)
  return {
    type: SET_CONNECTION,
    payload: result
  };
}

