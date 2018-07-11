'use strict';

import {
  CHANGE_COLOR_PICKED,
  SELECT_TOOL_PICKED,
  SELECT_PEN_WIDTH,
  UPDATE_USERLIST,
  ADD_NEW_CHAT_MESSAGE,
  UPDATE_CANVAS
} from '../../actions/game/actions';

const initialState = {
  toolPicked: 'pencil',
  colorPicked: '#000',
  penWidth: '1px',
  playerList: [],
  messages: [],
  lastDraw: null
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
    case UPDATE_USERLIST:
      return Object.assign({}, state, {
        playerList: action.payload
      });
    case ADD_NEW_CHAT_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload]
      });
    case UPDATE_CANVAS:
    return Object.assign({}, state, {
      lastDraw: action.payload
    });
    default:
      return state;
  }
}
