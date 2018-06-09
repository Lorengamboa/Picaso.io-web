'use strict';

class Player {
    constructor(name, socket) {
        this.name = name;
        this.socket = socket;
        this.lobby = null;
    }

    joinLobby (value) {
        this.lobby = this.value;
        this.socket.join(this.lobby);
    }

    leaveLobby () {
        this.socket.leave(this.lobby);
    }

    sendMessage (msg) {
        this.lobby.updateChat(msg);
    }

}

module.exports = Player
;