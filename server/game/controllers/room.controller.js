"use strict";

const Room = require("../room/Room");
const { createRandomString } = require("../../utils");

const roomController = {
  RoomCreator: class RoomCreator {
    constructor(io) {
      this.io = io;
    }
    createPublicGame() {
      try {
        const roomName = createRandomString();
        const game = new Room(roomName, this.io);
        return game;
      } catch (err) {
        return err;
      }
    }
    createPrivateGame(gameInfo) {
      try {
        const roomName = gameInfo.roomName;
        const game = new Room(roomName, this.io, "private");

        return game;
      } catch (err) {
        return err;
      }
    }
  },
  deleteRoom: function(roomId) {
    const filterRooms = this.games.public.filter(game => {
      if (game.name === roomId) return false;
    });

    this.games.public = filterRooms;
  },
  isRoomEmpty: function(room) {
    if (room.players.length === 0) return true;
    return false;
  }
};

module.exports = roomController;
