"use strict";

import receiver from "./Receiver";
import SOCKET_EVENTS from './events';

class SocketManager {
  constructor(socket, store) {
    this.socket = socket;
    this.store = store;
    receiver(this.socket, this.store);
  }

  /**
   *
   */
  joinRandomRoom(username) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, username);
  }
  /**
   *
   * @param {*} msg
   */
  sendMessage(msg) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg);
  }
  /**
   *
   * @param {*} data
   */
  drawCanvas(data) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_DRAWING, data);
  }

  /**
   * 
   */
  clearCanvas() {
    this.socket.emit(SOCKET_EVENTS.CLEAR_CANVAS);
  }
}

export default SocketManager;
