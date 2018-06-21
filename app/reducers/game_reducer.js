'use strict';

import { UPDATE_CANVAS } from '../actions/game_action';

const initialState = {
  myCanvas: {
    width: 0,
    height: 0
  }
};

export default function GameReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CANVAS:
      return Object.assign({}, state, {
        myCanvas: action.payload
      });
    default:
      return state;
  }
} 