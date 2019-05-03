"use strict";

import * as ACTIONS from "./actions";
import * as PLAYER_ACTIONS from "../player/actions";
import initialState from "../initialState";

export default function playerReducer(state = initialState.socket, action) {
  switch (action.type) {
    case ACTIONS.SOCKET_CONNECTION:
      return Object.assign({}, state, {
        loading: true
      });
    case PLAYER_ACTIONS.CREATE_ROOM:
      return Object.assign({}, state, {
        loading: true
      });
    case ACTIONS.SET_CONNECTION:
      return Object.assign({}, state, {
        loading: false,
        connection: action.payload
      });
    case ACTIONS.DISCONNECT_GAME_ROOM:
      return Object.assign({}, state, {
        loading: false,
        connection: null
      });
    case ACTIONS.CONNECTION_ERROR:
      return Object.assign({}, state, {
        loading: false,
        connection: null
      });

    default:
      return state;
  }
}
