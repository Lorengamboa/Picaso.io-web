'use strict';

class Game {
    constructor(name, io) {
        this.name = name;
        this.io = io;
        this.players = [];
        this.currentWord;
        this.currentPlayer;
        this.scores = [];
    }

    playerSendsMessage(id, msg) {
        io.to(name).emit(msg);
    }
}

module.exports = Game;