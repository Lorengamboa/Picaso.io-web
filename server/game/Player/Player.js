'use strict';

const { SOCKET_EVENTS } = require('../../events');
const { GAME_AVATARS } = require('../config/constants');
const { rndValueArray } = require('../../utils');
/**
 * Class Player
 */
class Player {
  constructor(name, socket) {
    // socket && id
    this.socket = socket;
    this.id = this.socket.id;
    //
    this.name = name;
    this.gameroom = null;
    this.color = null;
    this.avatar = rndValueArray(GAME_AVATARS);

    // Player is drawing now
    this.socket.on(SOCKET_EVENTS.PLAYER_DRAWING, drawingInfo => {
      this.gameroom.updateCanvas(this.socket, drawingInfo);
    });
    // Clears canvas
    this.socket.on(SOCKET_EVENTS.CLEAR_CANVAS, () => {
      this.gameroom.clearPlayerCanvas(socket);
    });
    // Player sends a msg to the entire chatroom
    this.socket.on(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg => {
      this.gameroom.playerSendsMessage(this.id, msg);
    });
  }

  /**
   * Joins a specific game room
   * @param {Object} gameroom
   */
  joinGameRoom(gameroom) {
    this.gameroom = gameroom;
    return gameroom.requestJoin(this);
  }

  /**
   * Leaves room that was once joined
   */
  leaveGameRoom() {
    return this.gameroom.requestLeave(this);
  }
}

module.exports = Player;
