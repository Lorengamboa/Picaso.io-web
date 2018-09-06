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
   * Joins random room
   */
  joinRandomRoom(username) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, username);
  }

  /**
   * Joins random room
   */
  joinPrivateRoom(username, roomId) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_PRIVATE_GAMEROOM, username, roomId);
  }

  /**
   * Sends a message to the general chat
   * @param {*} msg
   */
  sendMessage(msg) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg);
  }
  /**
   * Makes a draw action over the canvas
   * @param {*} data
   */
  drawCanvas(data) {
    this.socket.emit(SOCKET_EVENTS.PLAYER_DRAWING, data);
  }
  /**
   * cleans whole canvas
   */
  clearCanvas() {
    this.socket.emit(SOCKET_EVENTS.CLEAR_CANVAS);
  }
}

export default SocketManager;
