"use strict";

import * as ACTIONS from "../../actions/game/actions";
import { initialState } from "./initialState";

export default function GameReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_COLOR_PICKED:
      return Object.assign({}, state, {
        colorPicked: action.payload
      });
    case ACTIONS.SELECT_TOOL_PICKED:
      return Object.assign({}, state, {
        toolPicked: action.payload
      });
    case ACTIONS.SELECT_PEN_WIDTH:
      return Object.assign({}, state, {
        penWidth: action.payload
      });
    case ACTIONS.UPDATE_USERLIST:
      return Object.assign({}, state, {
        playerList: action.payload
      });
    case ACTIONS.ADD_NEW_CHAT_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload]
      });
    case ACTIONS.UPDATE_CANVAS:
      return Object.assign({}, state, {
        lastDraw: action.payload
      });
    case ACTIONS.UPDATE_TIMER:
      return Object.assign({}, state, {
        countDown: action.payload
      });
    case ACTIONS.UPDATE_GAME_STATE:
      return Object.assign({}, state, {
        gamePlay: action.payload
      });
    case ACTIONS.DISPLAY_PLAYERS_DRAW:
      return Object.assign({}, state, {
        playersDraw: action.payload
      });
    case ACTIONS.DISPLAY_CURRENT_WORD:
      return Object.assign({}, state, {
        currentWord: action.payload
      });
    default:
      return state;
  }
}
