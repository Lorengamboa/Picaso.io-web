'use strict';

import { updatePlayerList, addMessageToChat, updateCanvas } from '../../actions/game/game_action';
import SOCKET_EVENTS from './events';

const Receiver = (socket, store) => {

  socket.on(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, data => {
    store.dispatch(addMessageToChat(data));
  });

  socket.on(SOCKET_EVENTS.UPDATE_CHAT_PLAYER_MESSAGE, data => {
    store.dispatch(addMessageToChat(data));
  });

  socket.on(SOCKET_EVENTS.UPDATE_USER_LIST, function (playerList) {
    store.dispatch(updatePlayerList(playerList));
  });

  socket.on(SOCKET_EVENTS.UPDATE_CANVAS, data => {
    store.dispatch(updateCanvas(data));
  });

};

export default Receiver;
