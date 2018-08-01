'use strict';

import SOCKET_EVENTS from './events';
import { updatePlayerList, addMessageToChat, updateCanvas, updateTimer, updateGameState, fetchPlayersDraw, displayCurrentWord } from '../../actions/game/game_action';

const Receiver = (socket, store) => {
  socket.on(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, data => {
    store.dispatch(addMessageToChat(data));
  });

  socket.on(SOCKET_EVENTS.UPDATE_CHAT_PLAYER_MESSAGE, data => {
    store.dispatch(addMessageToChat(data));
  });

  socket.on(SOCKET_EVENTS.UPDATE_USER_LIST, playerList => {
    store.dispatch(updatePlayerList(playerList));
  });

  socket.on(SOCKET_EVENTS.UPDATE_CANVAS, data => {
    store.dispatch(updateCanvas(data));
  });

  socket.on(SOCKET_EVENTS.UPDATE_TIMER, data => {
    store.dispatch(updateTimer(data));
  });
  
  socket.on(SOCKET_EVENTS.UPDATE_GAME_STATE, data => {
    store.dispatch(updateGameState(data));
  }); 

  socket.on(SOCKET_EVENTS.DISPLAY_PLAYERS_DRAW, data => {
    store.dispatch(fetchPlayersDraw(data));
  }); 

  socket.on(SOCKET_EVENTS.DISPLAY_CURRENT_WORD, data => {
    store.dispatch(displayCurrentWord(data));
  }); 
  
};

export default Receiver;
