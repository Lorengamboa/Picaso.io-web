'use strict';

import { CHANGE_USERNAME } from '../actions/player_action';

const initialState = {
  username: '',
};

export default function PlayerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      });
    default:
      return state;
  }
} 