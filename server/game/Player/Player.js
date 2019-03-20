'use strict';

const useragent = require('useragent');
const applyListeners = require("./listeners");
const { GAME_AVATARS } = require('../config/constants');
const { rndValueArray } = require('../../utils');
/**
 * @class Player
 * @description
 */
class Player {
  constructor(name, socket) {
    this.socket = socket;
    this.id = this.socket.id;
    this.ip = this.socket.request.connection.remoteAddress;
    this.agent = useragent.is(this.socket.request.headers['user-agent']);
    this.device = (this.agent.android || this.agent.mobile_safari) ? "mobile" : "desktop";
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
