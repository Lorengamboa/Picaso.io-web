'use strict';

const Game = require("./Game");
const Player = require("../game/Player");
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
        playerJoinRandomGame: function (username, socket) {
            return new Promise((resolve, reject) => {
                try {
                    if(username === "") reject("Username cant be blank");

                    const player = new Player(username, socket);

                    if (this.games.length < 1) this.createNewGame();
                    const gameRoom = rndValueArray(this.games);
                    player.joinGameRoom(gameRoom);

                    resolve(player);
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}

module.exports = gamesController;

