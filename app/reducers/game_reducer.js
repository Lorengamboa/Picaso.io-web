'use strict';

import { CHANGE_COLOR_PICKED, SELECT_TOOL_PICKED, SELECT_PEN_WIDTH } from '../actions/game/actions';

const initialState = {
  toolPicked: 'pencil',
  colorPicked: "#000",
  penWidth: "1px"
};

export default function GameReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR_PICKED:
      return Object.assign({}, state, {
        colorPicked: action.payload
      });
    case SELECT_TOOL_PICKED:
      return Object.assign({}, state, {
        toolPicked: action.payload
      });
    case SELECT_PEN_WIDTH:
      return Object.assign({}, state, {
        penWidth: action.payload
      });
    default:
      return state;
  }
} 