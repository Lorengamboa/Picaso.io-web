'use strict';

const Game = require("./Game");
const { createRandomString, rndValueArray } = require("../utils");

const gamesController = (socket) => {
    const io = socket;
    return {
        // All games available
        games: [],
        // Creates new lobby
        createNewGame: function () {
            const roomName = createRandomString();
            const game = new Game(roomName, io);

            this.games.push(game);
        },
        // Player joins a random lobby
        playerJoinRandomGame: function (player) {
            return new Promise((resolve, reject) => {
                try {
                    if (this.games.length < 1) this.createNewGame();
                    const gameRoom = rndValueArray(this.games);
                    player.joinGameRoom(gameRoom);

                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}

module.exports = gamesController;

