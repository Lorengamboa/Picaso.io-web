'use strict';

const Game = require("./room/Game");
const Player = require("./Player");
const { createRandomString, rndValueArray, valiteNickname } = require("../utils");

/**
 * Object controller in charge of managing the player join/leave flow 
 * @param {Object} socket 
 */
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
                if (!valiteNickname(username)) return reject("Invalid username", username);

                try {
                    const player = new Player(username, socket);

                    if (this.games.length < 1) this.createNewGame();
                    const gameRoom = rndValueArray(this.games);
                    player.joinGameRoom(gameRoom)
                        .then(() => {
                            resolve(player);
                        })
                        .catch(err => {
                            reject(err);
                        })

                } catch (err) {
                    reject(err);
                }
            });
        },
        //player join a specific game
        playerJoinGame: function (username, socket, game) {
            return new Promise((resolve, reject) => {
                try {
                    if (username === "") reject("Username cant be blank");

                    const player = new Player(username, socket);
                    player.joinGameRoom(game);

                    resolve(player);
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}

module.exports = gamesController;

