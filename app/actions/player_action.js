'use strict';

export const CHANGE_USERNAME = '';

/**
 * 
 * @param {String} username 
 */
export function setUsername(username) {
  return {
    type: CHANGE_USERNAME,
    payload: username
  }
}

