'use strict';

const Game = require("./Game");
const { createRandomString, rndValueArray } = require("../utils");

const gamesController = (socket) => {
    const io = socket;
    return {
        //
        lobbies: [],
        // Creates new lobby
        createNewGame: () => {
            const roomName = createRandomString();
            const game = new Game(roomName, io);

            this.lobbies.push(game);
        },
        // Player joins a random lobby
        playerJoinRandomGame: (player) => { // TODO: MAKE A PROMISE FUNCTION
            if (lobbies.length < 1) this.createNewLobby();

            var lobby = rndValueArray(lobbies);
            this.playerJoinLobby(player, lobby);
        }
    }
}

module.exports = gamesController;

