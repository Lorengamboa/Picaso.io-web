"use strict";

import receiver from "./receiver";
import S from "../../constants/socket";

/**
 * @class SocketManager
 * @description
 */
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
    this.socket.emit(S.EMITTER.PLAYER_JOIN_RANDOM_GAMEROOM, username);
  }

  /**
   * Joins random room
   */
  joinPrivateRoom(username, roomId) {
    this.socket.emit(S.EMITTER.PLAYER_JOIN_PRIVATE_GAMEROOM, username, roomId)
  }

  /**
   * Player Creates room
   */
  createRoom(settings) {
    this.socket.emit(S.EMITTER.PLAYER_CREATES_GAME, settings);
  }

  /**
   * Sends a message to the general chat
   * @param {*} msg
   */
  sendMessage(msg) {
    this.socket.emit(S.EMITTER.PLAYER_SEND_MESSAGE, msg);
  }

  /**
   * Makes a draw action over the canvas
   * @param {*} data
   */
  drawCanvas(data) {
    this.socket.emit(S.EMITTER.PLAYER_DRAWING, data);
  }
  
  /**
   * cleans whole canvas
   */
  clearCanvas() {
    this.socket.emit(S.EMITTER.CLEAR_CANVAS);
  }
}

export default SocketManager;
