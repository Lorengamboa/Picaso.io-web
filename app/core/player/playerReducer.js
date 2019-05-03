"use strict";

import * as ACTIONS from "./actions";
import initialState from "../initialState";

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      });
      case ACTIONS.MAKE_DRUNK:
      return Object.assign({}, state, {
        drunk: action.payload
      });
    default:
      return state;
  }
}
