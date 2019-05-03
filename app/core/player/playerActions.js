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
 * Creates room
 * @param {*} settings
 */
export function createRoom(settings) {
  return {
    type: ACTIONS.CREATE_ROOM,
    payload: settings
  };
}

/**
 * Join game
 * @param {*} id
 */
export function joinGame(roomId, pass) {
  return {
    type: ACTIONS.CONNECT_PRIVATE_ROOM,
    payload: {
      roomId, pass
    }
  };
}

/**
 * 
 */
export function pencilDrinks() {
  return {
    type: ACTIONS.MAKE_DRUNK,
    payload: true
  };
}
