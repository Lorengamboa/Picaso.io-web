"use strict";

import {
  retrieveGameInfo,
  updatePlayerList,
  addMessageToChat,
  updateCanvas,
  updateTimer,
  updateGameState,
  fetchPlayersDraw,
  displayCurrentWord
} from "../actions/game/game_action";

import { setConnection } from "../actions/player/player_action";

const SOCKET_EVENTS = {
  RECEIVER: {
    RETRIEVE_GAME_INFO: ["retrieveGameInfo", retrieveGameInfo],
    UPDATE_CHAT_PLAYER_MESSAGE: ["playerMessage", addMessageToChat],
    UPDATE_CHAT_INFORM_MESSAGE: ["generalMessage", addMessageToChat],
    UPDATE_USER_LIST: ["updateUserList", updatePlayerList],
    UPDATE_CANVAS: ["updateCanvas", updateCanvas],
    UPDATE_TIMER: ["updateTimer", updateTimer],
    UPDATE_GAME_STATE: ["updateGameState", updateGameState],
    DISPLAY_PLAYERS_DRAW: ["playerDraws", fetchPlayersDraw],
    DISPLAY_CURRENT_WORD: ["currentWord", displayCurrentWord],
    CONNECTION_RESULT: ["connectionResult", setConnection]
  },
  EMITTER: {
    PLAYER_JOIN_RANDOM_GAMEROOM: "joinRandomRoom",
    PLAYER_JOIN_PRIVATE_GAMEROOM: "joinPrivateRoom",
    PLAYER_CREATES_GAME: "playerCreatesGame",
    PLAYER_LEAVE_GAMEROOM: "leaveGameRoom",
    PLAYER_SEND_MESSAGE: "sendMessage",
    PLAYER_DRAWING: "drawing",
    CLEAR_CANVAS: "clearCanvas",
    PLAYER_DISCONNECT: "disconnect"
  }
};

export default SOCKET_EVENTS;
