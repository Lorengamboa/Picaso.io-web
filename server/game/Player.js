'use strict';

class Player {
    constructor(name, io) {
        this.name = name;
        this.socket = socket;
        this.gameRoom = null;
    }

    joinLobby (value) {
        this.lobby = this.value;
        this.socket.join(this.lobby);
    }

    leaveLobby () {
        this.socket.leave(this.lobby);
    }

    sendMessage (msg) {
        this.gameRoom.playerSendsMessage(id,msg);
    }

}

module.exports = Player;