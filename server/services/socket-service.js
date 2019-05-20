"use strict";

const logger = require("../../logger");
const gameManager = require("../game/manager");
const { SOCKET_EVENTS } = require("../constants/socket-events");
const message = require("../constants/log-msg");

/**
 * Starts the socket module
 * @param {Object} http
 */
module.exports = {
  init: io => {
    this.io = io;
    let game_ctrl = new gameManager(this.io);

    this.io.on(SOCKET_EVENTS.CONNECT, socket => {
      let player;

      /**
       * @event PLAYER_JOIN_RANDOM_GAMEROOM
       * @description player joins a public random game room 
       */
      socket.on(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, username => {
        game_ctrl
          .playerJoinRandomGame(username, socket)
          .then(nplayer => {
            player = nplayer;
            socket.emit(SOCKET_EVENTS.CONNECTION_RESULT, true);
            logger.sockets.info(
              message.LOG_SOCKET_SUCCESSFULL_CONNECTION + player
            );
          })
          .catch(err => {
            socket.disconnect();
            socket.emit(SOCKET_EVENTS.CONNECTION_RESULT, false);
            logger.sockets.error(message.LOG_SOCKET_FAIL_CONNECTION + err);
          });
      });

      /**
       * @event PLAYER_JOIN_SELECTED_GAMEROOM
       * @description player joins a chosen game room 
       */
      socket.on(
        SOCKET_EVENTS.PLAYER_JOIN_SELECTED_GAMEROOM,
        (username, data) => {
          game_ctrl
            .playerJoinGame(username, socket, data)
            .then(nplayer => {
              player = nplayer;
              socket.emit(SOCKET_EVENTS.CONNECTION_RESULT, true);
              logger.sockets.info(
                message.LOG_SOCKET_SUCCESSFULL_CONNECTION + player
              );
            })
            .catch(err => {
              socket.emit(SOCKET_EVENTS.CONNECTION_RESULT, false);
              socket.disconnect();
              logger.sockets.error(message.LOG_SOCKET_FAIL_CONNECTION + err);
            });
        }
      );

      /**
        * @event PLAYER_CREATES_GAME
        * @description player creates a costum game room
        */
      socket.on(SOCKET_EVENTS.PLAYER_CREATES_GAME, settings => {
        game_ctrl
          .playerCreatesGame(settings, socket)
          .then(nplayer => {
            player = nplayer;
            socket.emit(SOCKET_EVENTS.CONNECTION_RESULT, true);
            logger.sockets.info(
              message.LOG_PLAYER_CREATES_ROOM_SUCCESS + player
            );
          })
          .catch(err => {
            socket.emit(SOCKET_EVENTS.CONNECTION_RESULT, false);
            socket.disconnect();
            logger.sockets.error(message.LOG_PLAYER_CREATES_ROOM_FAIL + err);
          });
      });

      /**
        * @event SOCKET_EVENTS
        * @description player disconnects
        */
      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        if (!player) return;
        game_ctrl
          .playerLeaveRoom(player)
          .then(player => {
            player = null;
            logger.sockets.info(message.LOG_PLAYER_LEAVES_SUCCESS + player);
          })
          .catch(err => {
            socket.disconnect();
            logger.sockets.error(message.LOG_PLAYER_LEAVES_SUCCESS + err);
          });
      });

    });

    return game_ctrl;
  }
};
