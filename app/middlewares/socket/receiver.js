"use strict";

import { addMessage } from '../../actions/game/game_action';

/**
 *
 * @param {*} socket
 */
const socketReceiver = function (socket, store) {
  socket.on("informMessage", data => {
    store.dispatch(addMessage(data));
  });
  
};

export default socketReceiver;
