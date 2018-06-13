'use strict';

class Player {
    constructor(name, socket) {
        this.name = name;
        this.socket = socket;
        this.gameroom = null;
    }

    /**
     * 
     * @param {*} gameroom 
     */
    joinGameRoom(gameroom) {
        const id = this.socket.id;
        this.gameroom = gameroom;

        this.socket.join(this.gameroom.name);
        this.gameroom.informsPlayerJoined(id, this.name);
    }

    /**
     * 
     */
    leaveGameRoom() {
        const id = this.socket.id;

        this.socket.leave(this.gameroom);
        this.gameroom.informsPlayerLeft(id);
    }

    /**
     * 
     * @param {*} msg 
     */
    sendMessage(msg) {
        this.gameroom.playerSendsMessage(this.name, msg);
    }
}

module.exports = Player;