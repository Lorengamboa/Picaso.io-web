'use strict';

import { CHANGE_COLOR_PICKED } from '../actions/game_action';

const initialState = {
  colorPicked: "#000",
  penWidth: "1px"
};

export default function GameReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR_PICKED:
    return Object.assign({}, state, {
      colorPicked: action.payload
    });
    default:
      return state;
  }
} 