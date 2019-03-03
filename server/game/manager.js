"use strict";
const _ = require("lodash");

const { RoomCreator, isRoomEmpty, deleteRoom } = require("./room/controller");
const Player = require("./Player");
const { rndValueArray, valiteNickname } = require("../utils");
const list_names = require("./config/names");

/**
 * Object controller in charge of managing the player join/leave flow
 * @param {Object} socketio
 */
const gameManager = socketio => {
  const io = socketio;
  return {
    // All games available
    games: {
      private: [],
      public: []
    },
    roomCreator: new RoomCreator(io),
    /**
     *
     */
    getPublicGames: function() {
      if (this.games.public.length === 0) return;
      const filteredRooms = this.games.public.map(game => {
        const filteredRoom = {
          name: game.name,
          players: getPlayerNames(game.players)
        };
        return filteredRoom;
      });

      function getPlayerNames(players) {
        return players.map(player => {
          return player.name;
        });
      }

      return filteredRooms;
    },
    /**
     * Players manually creates a room game
     * from our client interface
     */
    playerCreatesGame: function(gameInfo, socket) {
      let gameRoom;
      if (gameInfo.private) {
        gameRoom = this.roomCreator.createPrivateGame(gameInfo);
        this.games.private.push(gameRoom);
      } else {
        gameRoom = this.roomCreator.createPublicGame(gameInfo);
        this.games.public.push(gameRoom);
      }

      return this.playerJoinGame(
        gameInfo.nickname,
        socket,
        gameRoom.name,
        gameInfo.private
      );
    },
    /**
     * @description: Player joins a public(random) game room
     * @param {*} username
     * @param {*} socket
     */
    playerJoinRandomGame: function(username, socket) {
      let usr = username;
      if (!usr) usr = rndValueArray(list_names);
      usr = "(guest) " + usr;
      return new Promise((resolve, reject) => {
        if (!valiteNickname(usr)) return reject("Invalid username", usr);
        if (!socket) return reject("Missing socket object");

        try {
          // if there are not rooms then it will create a new one
          if (!this.games.public.length) {
            const game_created = this.roomCreator.createPublicGame();
            this.games.public.push(game_created);
          }

          // from all the rooms created, selects one
          const gameRoom = rndValueArray(this.games.public);
          // creates new user (Player)
          const player = new Player(usr, socket);

          // player joins the room created ...
          player
            .joinGameRoom(gameRoom)
            .then(() => {
              resolve(player);
            })
            .catch(err => {
              reject(err);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    /**
     * @description: player join a game room
     * @param {*} username
     * @param {*} socket
     * @param {*} roomId
     */
    playerJoinGame: function(username, socket, roomId, isRoomPrivate) {
      let usr = username;
      if (!usr) usr = rndValueArray(list_names);

      return new Promise((resolve, reject) => {
        try {
          if (!valiteNickname(usr)) return reject("Invalid username", usr);
          if (!socket) return reject("Missing socket object");

          // if the room doesnt already exist, it will create one
          // then it will proceed to find the room class object
          const gameRoom = _.find(
            isRoomPrivate ? this.games.private : this.games.public,
            { name: roomId }
          );
          if (!gameRoom) return reject("game doesnt exist dude");

          // player joins the private room created ...
          const player = new Player(usr, socket);
          player
            .joinGameRoom(gameRoom)
            .then(() => {
              resolve(player);
            })
            .catch(err => {
              reject(err);
            });

          resolve(player);
        } catch (err) {
          reject(err);
        }
      });
    },
    /**
     * Player leaves room
     * @param {Object} player 
     */
    playerLeaveRoom: function(player) {
      const roomId = player.gameroom.name;
      return new Promise((resolve, reject) => {
        try {
          player
            .leaveGameRoom()
            .then(() => {
              resolve(player);
            })
            .catch(err => {
              reject(err);
            });
          if (isRoomEmpty(player.gameroom)) deleteRoom.call(this, roomId);
          resolve(player.name);
        } catch (error) {
          reject(error);
        }
      });
    }
  };
};

module.exports = gameManager;
