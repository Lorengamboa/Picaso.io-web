"use strict";

import receiver from "./receiver";
import { SOCKET_EVENTS } from "../../constants/socket";

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
    this.socket.emit(SOCKET_EVENTS.EMITTER.PLAYER_JOIN_RANDOM_GAMEROOM, username);
  }

  /**
   * Joins random room
   */
  joinPrivateRoom(username, roomId) {
    this.socket.emit(SOCKET_EVENTS.EMITTER.PLAYER_JOIN_PRIVATE_GAMEROOM, username, roomId)
  }

  /**
   * Player Creates room
   */
  createRoom(settings) {
    this.socket.emit(SOCKET_EVENTS.EMITTER.PLAYER_CREATES_GAME, settings);
  }

  /**
   * Sends a message to the general chat
   * @param {*} msg
   */
  sendMessage(msg) {
    this.socket.emit(SOCKET_EVENTS.EMITTER.PLAYER_SEND_MESSAGE, msg);
  }

  /**
   * 
   * @param {*} data 
   */
  voteDraw(data) {
    this.socket.emit(SOCKET_EVENTS.EMITTER.PLAYER_VOTES_DRAW, data);
  }

  /**
   * Makes a draw action over the canvas
   * @param {*} data
   */
  drawCanvas(data) {
    this.socket.emit(SOCKET_EVENTS.EMITTER.PLAYER_DRAWING, data);
  }
  
  /**
   * cleans whole canvas
   */
  clearCanvas() {
    this.socket.emit(SOCKET_EVENTS.EMITTER.CLEAR_CANVAS);
  }
  
  /**
   * 
   */
  drinkVodka() {
    this.socket.emit(SOCKET_EVENTS.EMITTER.DRINK_VODKA);
  }
}

export default SocketManager;
