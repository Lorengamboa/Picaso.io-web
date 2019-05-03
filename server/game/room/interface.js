"use strict";

const Room = require("./Room");
const attachEvents = require("./pubsub/observer");
const { createRandomString } = require("../../utils");
const { CreateRoomError } = require("./error/GenericRoomErrors");

const roomController = {
  RoomCreator: class RoomCreator {
    constructor(io) {
      this.io = io;
    }
    createPublicGame() {
      try {
        const roomName = createRandomString();
        const game = new Room(roomName, this.io);
        attachEvents(game);
        
        return game;
      } catch (err) {
          throw new CreateRoomError(err);
      }
    }
    createPrivateGame(gameInfo) {
      try {
        const { roomName, pass } = gameInfo;
        const game = new Room(roomName, this.io, "private", pass);
        attachEvents(game);
        
        return game;
      } catch (err) {
          throw new CreateRoomError(err);
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
