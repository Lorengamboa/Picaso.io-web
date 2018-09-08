'use strict';

const { SOCKET_EVENTS } = require('../../events');

/**
 * Class Player
 */
class Player {
  constructor(name, socket) {
    this.name = name;
    this.socket = socket;
    this.gameroom = null;
    this.color = null;
    this.id = this.socket.id;

    // Player is drawing now
    this.socket.on(SOCKET_EVENTS.PLAYER_DRAWING, drawingInfo => {
      this.gameroom.updateCanvas(this.socket, drawingInfo);
    })
    // Clears canvas
    this.socket.on(SOCKET_EVENTS.CLEAR_CANVAS, () => {
      this.gameroom.clearPlayerCanvas(socket);
    })
    // Player sends a msg to the entire chatroom
    this.socket.on(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg => {
      this.gameroom.playerSendsMessage(this.id, msg);
    })
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
    this.socket.leave(this.gameroom);
    this.gameroom.informsPlayerLeft(this.id);
  }
}

module.exports = Player;
