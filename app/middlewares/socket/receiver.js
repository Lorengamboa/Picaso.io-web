'use strict';

import SOCKET_EVENTS from './events';
import { retrieveGameInfo, updatePlayerList, addMessageToChat, updateCanvas, updateTimer, updateGameState, fetchPlayersDraw, displayCurrentWord } from '../../actions/game/game_action';

/**
 * 
 * @param {*} socket 
 * @param {*} store 
 */
const Receiver = (socket, store) => {
  // helper function
  const socketOn = (event, action) => {
    socket.on(event, data => {
      store.dispatch(action(data));
    });
  }

  //
  socketOn(SOCKET_EVENTS.RETRIEVE_GAME_INFO, retrieveGameInfo);
  //
  socketOn(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, addMessageToChat);
  //
  socketOn(SOCKET_EVENTS.UPDATE_CHAT_PLAYER_MESSAGE, addMessageToChat);
  //
  socketOn(SOCKET_EVENTS.UPDATE_USER_LIST, updatePlayerList);
  //
  socketOn(SOCKET_EVENTS.UPDATE_CANVAS, updateCanvas);
  //
  socketOn(SOCKET_EVENTS.UPDATE_TIMER, updateTimer);
  //
  socketOn(SOCKET_EVENTS.UPDATE_GAME_STATE, updateGameState);
  //
  socketOn(SOCKET_EVENTS.DISPLAY_PLAYERS_DRAW, fetchPlayersDraw);
  //
  socketOn(SOCKET_EVENTS.DISPLAY_CURRENT_WORD, displayCurrentWord);
  //
};

export default Receiver;
