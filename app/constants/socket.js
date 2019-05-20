"use strict";

import {
  retrieveGameInfo,
  updatePlayerList,
  addMessageToChat,
  updateCanvas,
  updateTimer,
  updateRoundCounter,
  updateGameState,
  fetchPlayersDraw,
  displayCurrentWord,
  displayWinners
} from "../core/game/gameActions";

import {
  disconnectGameRoom,
  connectionError,
  setConnection,
  inactivityPunishment
} from "../core/socket/socketActions";

import { displaySnackBar, notifyMessage } from "../core/general/generalActions";

const SOCKET_EVENTS = {
  RECEIVER: {
    DISCONNECT: ["disconnect", disconnectGameRoom],
    INACTIVITY: ["inactivity", inactivityPunishment],
    RETRIEVE_GAME_INFO: ["retrieveGameInfo", retrieveGameInfo],
    UPDATE_CHAT_PLAYER_MESSAGE: ["playerMessage", addMessageToChat],
    UPDATE_CHAT_INFORM_MESSAGE: ["generalMessage", addMessageToChat],
    UPDATE_USER_LIST: ["updateUserList", updatePlayerList],
    UPDATE_CANVAS: ["updateCanvas", updateCanvas],
    UPDATE_TIMER: ["updateTimer", updateTimer],
    UPDATE_ROUND_COUNTER: ['updateRoundCounter', updateRoundCounter],
    UPDATE_GAME_STATE: ["updateGameState", updateGameState],
    DISPLAY_PLAYERS_DRAW: ["playerDraws", fetchPlayersDraw],
    DISPLAY_CURRENT_WORD: ["currentWord", displayCurrentWord],
    DISPLAY_WINNERS: ['displayWinners', displayWinners],
    CONNECTION_RESULT: ["connectionResult", setConnection],
    CONNECTION_ERROR: ["connect_error", connectionError],
    ERROR: ["error", connectionError],
    NOTIFY_MESSAGE: ["notifyMessage", notifyMessage],
    COSTUM: ["costum_error", displaySnackBar]
  },
  EMITTER: {
    PLAYER_JOIN_RANDOM_GAMEROOM: "joinRandomRoom",
    PLAYER_JOIN_PRIVATE_GAMEROOM: "joinPrivateRoom",
    PLAYER_CREATES_GAME: "playerCreatesGame",
    PLAYER_LEAVE_GAMEROOM: "leaveGameRoom",
    PLAYER_SEND_MESSAGE: "sendMessage",
    PLAYER_DRAWING: "drawing",
    PLAYER_VOTES_DRAW: "playerVotesDraw",
    CLEAR_CANVAS: "clearCanvas",
    PLAYER_DISCONNECT: "disconnect",
    DRINK_VODKA: "drinkVodka"
  }
};

const SOCKET_ERRORS = {
  1000: "Ooops something went wrong",
  0: "The room is full",
  10: "The room doesnt exist",
  20: "You are banned!",
  30: "Username introduced not valid",
  40: "Message way too long",
  50: "Message cant be blank",
  60: "The game room doesn't exist",
  70: "Invalid password"
};

export { SOCKET_EVENTS, SOCKET_ERRORS };
