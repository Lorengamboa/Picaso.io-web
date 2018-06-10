'use strict';

const socketio = require('socket.io');
const gamesController = require('../game/gamesController');

const startSockets = http => {
    
    const io = socketio(http);
    const game_ctrl = gamesController(io);

    io.on('connection', socket => {

        // Creates new player
        const player = new Player(socket.name, socket);

        game_ctrl.playerJoinRandomGame(player);
        
        // Player leaves gameroom
        socket.on('leaveLobby', () => {
            player.leaveLobby();
        });

        // Player sends a msg to the entire chatroom
        socket.on('sendMessage', msg => {
            player.sendMessage(msg);
        });

        // Player disconnects from socket
        socket.on('disconnect', () => { 
            player = null;
        });

    });
}

module.exports = startSockets;