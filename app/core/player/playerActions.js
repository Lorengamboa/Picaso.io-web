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
 */
export function pencilDrinks() {
  return {
    type: ACTIONS.MAKE_DRUNK,
    payload: true
  };
}
