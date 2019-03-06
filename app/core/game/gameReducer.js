"use strict";

import * as GAME_ACTIONS from "./actions";
import * as SOCKET_ACTIONS from "../socket/actions";

import initialState from "../initialState";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case GAME_ACTIONS.RETRIEVE_GAME_INFO:
      return Object.assign({}, state, {
        gameInfo: action.payload
      });
    case GAME_ACTIONS.TOGGLE_EXPAND:
      return Object.assign({}, state, {
        fullscreen: !state.fullscreen
      });
    case GAME_ACTIONS.CHANGE_COLOR_PICKED:
      return Object.assign({}, state, {
        colorPicked: action.payload
      });
    case GAME_ACTIONS.SELECT_TOOL_PICKED:
      return Object.assign({}, state, {
        toolPicked: action.payload
      });
    case GAME_ACTIONS.SELECT_PEN_WIDTH:
      return Object.assign({}, state, {
        penWidth: action.payload
      });
    case GAME_ACTIONS.UPDATE_USERLIST:
      return Object.assign({}, state, {
        playerList: action.payload
      });
    case GAME_ACTIONS.ADD_NEW_CHAT_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload]
      });
    case GAME_ACTIONS.UPDATE_CANVAS:
      return Object.assign({}, state, {
        lastDraw: action.payload
      });
    case GAME_ACTIONS.UPDATE_TIMER:
      return Object.assign({}, state, {
        countDown: action.payload
      });
    case GAME_ACTIONS.UPDATE_GAME_STATE:
      return Object.assign({}, state, {
        gamePlay: action.payload
      });
    case GAME_ACTIONS.DISPLAY_PLAYERS_DRAW:
      return Object.assign({}, state, {
        playersDraw: action.payload
      });
    case GAME_ACTIONS.DISPLAY_CURRENT_WORD:
      return Object.assign({}, state, {
        currentWord: action.payload
      });
    case GAME_ACTIONS.HIDE_MODAL:
      return Object.assign({}, state, {
        modal: action.payload
      });
    case SOCKET_ACTIONS.DISCONNECT_GAME_ROOM:
      return Object.assign({}, state, {
        modal: true
      });
    default:
      return state;
  }
}
