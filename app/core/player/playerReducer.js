"use strict";

import * as ACTIONS from "./actions";
import initialState from "../initialState";

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      });
    case ACTIONS.CREATE_ROOM:
      return Object.assign({}, state, {
        connection: true
      });
    default:
      return state;
  }
}
