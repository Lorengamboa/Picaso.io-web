'use strict';

const { SOCKET_EVENTS } = require("../socket/events");

/**
 * Class Player
 */
class Player {
    constructor(name, socket) {
        this.name = name;
        this.socket = socket;
        this.gameroom = null;

        /*
         * SOCKET PLAYER EVENTS
         */

        // Player is drawing now!
        this.socket.on(SOCKET_EVENTS.PLAYER_DRAWING, data => {
            this.gameroom.updateCanvas(data);
        });

        // Player leaves room!
        this.socket.on(SOCKET_EVENTS.PLAYER_LEAVE_GAMEROOM, data => {
            leaveGameRoom();
        });

    }

    /**
     * Joins a specific game room
     * @param {Object} gameroom 
     */
    joinGameRoom(gameroom) {
        const id = this.socket.id;
        this.gameroom = gameroom;

        this.socket.join(this.gameroom.name);
        this.gameroom.informsPlayerJoined(id, this.name);
    }

    /**
     * Leaves room that was once joined
     */
    leaveGameRoom() {
        const id = this.socket.id;

        this.socket.leave(this.gameroom);
        this.gameroom.informsPlayerLeft(id);
    }

    /**
     * Player sends a message to the entire room
     * @param {String} msg 
     */
    sendMessage(msg) {
        this.gameroom.playerSendsMessage(this.name, msg);
    }
}

module.exports = Player;