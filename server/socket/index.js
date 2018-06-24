'use strict';

const socketio = require('socket.io');
const chalk = require('chalk');
const gamesController = require('../game/gameController');
const { SOCKET_EVENTS } = require('./events');

/**
 * Starts the socket module
 * @param {} http 
 */
const startSockets = http => {

    const io = socketio(http);
    const game_ctrl = gamesController(io);

    io.on(SOCKET_EVENTS.CONNECT, socket => {

        let player;

        // Player joins random game room
        socket.on(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, username => {
            game_ctrl.playerJoinRandomGame(username, socket)
                .then(nplayer => {
                    player = nplayer;
                    console.log(chalk.green("✅  Socket connection openned"));
                })
                .catch(err => {
                    socket.disconnect();
                    console.log("❌ Socket connection failed: ", err);
                });
        });

        // Player disconnects from socket
        socket.on(SOCKET_EVENTS.DISCONNECT, function () {
            if (!player) return;
            player.leaveGameRoom();
            player = null;
            console.log(chalk.red("❌  Socket connection closed"));
        });

    });
}

module.exports = startSockets;