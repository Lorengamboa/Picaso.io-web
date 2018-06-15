'use strict';

const socketio = require('socket.io');
const chalk = require('chalk');
const gamesController = require('../game/gamesController');
const Player = require("../game/Player");
const { SOCKET_EVENTS } = require('./events');

const startSockets = http => {

    const io = socketio(http);
    const game_ctrl = gamesController(io);

    io.on(SOCKET_EVENTS.CONNECT, socket => {

        let player;

        // Player joins random game room
        socket.on(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, username => {
            player = new Player(username, socket)
            game_ctrl.playerJoinRandomGame(player)
                .then(() => {
                    console.log(chalk.green("✅  Socket connection openned"));
                })
                .catch(err => {
                    socket.disconnect();
                    console.log("❌ Socket connection failed", err);
                });
        });

        // Player leaves gameroom
        socket.on(SOCKET_EVENTS.PLAYER_LEAVE_LOBBY, () => {
            if (!player) return;
            player.leaveLobby();
        });

        // Player sends a msg to the entire chatroom
        socket.on(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg => {
            if (!player) return;
            player.sendMessage(msg);
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