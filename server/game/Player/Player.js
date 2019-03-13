'use strict';

const applyListeners = require("./listeners");
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
    this.drunk = false;
    this.avatar = rndValueArray(GAME_AVATARS);

    applyListeners.call(this);
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
