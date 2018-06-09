'use strict';

const socketio = require('socket.io');
const lobbyController = require('./lobbyController');
const Player = require("./Player");

const PORT = process.env.PORT || 8080;;

module.exports = http => {

    const io = socketio(http);

    //
    // SOCKETS CONNECTION
    // -----------------------------------------------------------------------------
    io.on('connection', function (socket) {

        const player = new Player(socket);

        lobbyController.playerJoinRandomLobby(player);
        
        // Player leaves lobby
        socket.on('leaveLobby', function () {
            player.leaveLobby();
        });

        // Player sends a message to general chat
        socket.on('sendMessage', function (msg) {
            player.sendMessage();
            io.to('some room').emit('some event');
            io.emit('updateChat', msg);
        });

        //
        socket.on('drawCanvas', function (msg) {
        });

        //
        socket.on('clearCanvas', function (msg) {
        });

        //
        socket.on('voteKickCurrentPlayer', function (msg) {
        });
    });

    http.listen(PORT, () => {
        console.log(`Picaso.io App listening on port ${PORT}`);
    });
}
