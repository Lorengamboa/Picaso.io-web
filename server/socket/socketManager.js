'use strict'

const chalk = require('chalk')
const gameManager = require('../game/gameManager')
const { SOCKET_EVENTS } = require('../events')

/**
 * Starts the socket module
 * @param {Object} http
 */
module.exports = {
  init: io => {
    this.io = io;
    let game_ctrl = gameManager(this.io);

    this.io.on(SOCKET_EVENTS.CONNECT, socket => {
      let player;

      // Player joins random game room
      socket.on(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, username => {
        game_ctrl
          .playerJoinRandomGame(username, socket)
          .then(nplayer => {
            player = nplayer;
            console.log(chalk.green('👨 - ✅  Socket connection openned'));
          })
          .catch(err => {
            socket.disconnect();
            console.log('👨 - ❌ Socket connection failed: ', err);
          })
      });


      // Player joins private game room
      socket.on(SOCKET_EVENTS.PLAYER_JOIN_PRIVATE_GAMEROOM, (username, roomId) => {
        game_ctrl
          .playerJoinGame(username, socket, roomId)
          .then(nplayer => {
            player = nplayer;
            console.log(chalk.green('👨 - ✅  Socket connection openned'));
          })
          .catch(err => {
            socket.disconnect();
            console.log('👨 - ❌ Socket connection failed: ', err);
          })
      });

      // Player creates game room
      socket.on(SOCKET_EVENTS.PLAYER_CREATES_GAME, settings => {
        game_ctrl
          .playerCreatesGame(settings, socket)
          .then(nplayer => {
            player = nplayer;
            console.log(chalk.green('🎮 - ✅  Player creates game'));
          })
          .catch(err => {
            socket.disconnect();
            console.log('🎮 - ❌ Failed creating game: ', err);
          })
      });

      // Player disconnects from socket
      socket.on(SOCKET_EVENTS.DISCONNECT, function () {
        if (!player) return;

        game_ctrl.playerLeaveRoom(player);
        player = null;
        console.log(chalk.red('👨 - ❌  Socket connection closed'));
      });
    });

    return game_ctrl;
  }
}
