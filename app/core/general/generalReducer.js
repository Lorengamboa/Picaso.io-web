"use strict";

import * as GENERAL_ACTION from "./actions";
import { CONNECTION_ERROR } from "../socket/actions";

import initialState from "../initialState";

/**
 *
 * @param {*} state
 * @param {*} action
 */
export default function gameReducer(state = initialState.general, action) {
  switch (action.type) {
    case CONNECTION_ERROR:
      return Object.assign({}, state, {
        level: "error",
        message: "Ooops, something went wrong!",
        timestamp: new Date()
      });
    case GENERAL_ACTION.DISPLAY_SNACKBAR:
      return Object.assign({}, state, {
        level: "error",
        message: action.payload,
        timestamp: new Date()
      });
    default:
      return state;
  }
}
