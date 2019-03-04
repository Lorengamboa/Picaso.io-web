"use strict";

import * as ACTIONS from "./actions";
import initialState from "../initialState";

export default function playerReducer(state = initialState.socket, action) {
  switch (action.type) {
    case ACTIONS.SOCKET_CONNECTION:
      return Object.assign({}, state, {
        loading: true
      });
    case ACTIONS.SET_CONNECTION:
      return Object.assign({}, state, {
        loading: false,
        connection: action.payload
      });
    default:
      return state;
  }
}
