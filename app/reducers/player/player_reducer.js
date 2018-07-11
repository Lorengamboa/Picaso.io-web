'use strict';

import { CHANGE_USERNAME, SOCKET_CONNECTION } from '../../actions/player/actions';

const initialState = {
  username: '',
  connection: false
};

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
    default:
      return state;
  }
} 