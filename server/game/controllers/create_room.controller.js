'use strict';

const Room = require("../room/Room");
const {
    createRandomString
} = require("../../utils");

class RoomCreator {
    constructor(io) {
        this.io = io;
    }

    /**
     * 
     */
    createPublicGame(gameInfo) {
        try {
            const roomName = createRandomString();
            const game = new Room(roomName, this.io);

            return game;
        }
        catch (err) {
            return err;
        }
    };

    /**
     * 
     */
    createPrivateGame(gameInfo) {
        try {
            const roomName = gameInfo.roomName;
            const game = new Room(roomName, this.io, 'private');

            return game;
        }
        catch (err) {
            return err;
        }

    };
}

module.exports = RoomCreator;