'use strict';

import { CHANGE_USERNAME, SOCKET_CONNECTION, CONNECT_PRIVATE_ROOM } from '../../actions/player/actions';
import { initialState } from './initialState';

export default function PlayerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      });
    case SOCKET_CONNECTION:
      return Object.assign({}, state, {
        connection: action.payload
      });
    case CONNECT_PRIVATE_ROOM:
      return Object.assign({}, state, {
        connection: action.payload
      });
    default:
      return state;
  }
} 