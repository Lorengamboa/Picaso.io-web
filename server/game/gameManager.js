"use strict";
const _ = require('lodash');

const { createPublicGame, createPrivateGame } = require('./controllers/create_room.controller');
const { isRoomEmpty } = require('./controllers/read_room.controller');
const deleteRoom = require('./controllers/delete_room.controller');

const Player = require("./Player");
const {
  rndValueArray,
  valiteNickname,
} = require("../utils");
const list_names = require('./config/names');

/**
 * Object controller in charge of managing the player join/leave flow
 * @param {Object} socket
 */
const gameManager = socket => {
  const io = socket;
  return {
    // All games available
    games: {
      private: [],
      public: [],
    },
    /**
     * 
     */
    getPublicGames: function () {
      if (this.games.public.length === 0) return;

      //const FILTER_KEYS = ['name', 'players'];
      //console.log(this.games.public[0]);
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
        })
      }

      return filteredRooms;
    },
    /**
     * @description: Player joins a public(random) game room
     * @param {*} username 
     * @param {*} socket 
     */
    playerJoinRandomGame: function (username, socket) {
      let usr = username;
      if (!usr) usr = rndValueArray(list_names);

      return new Promise((resolve, reject) => {
        if (!valiteNickname(usr))
          return reject("Invalid username", usr);
        if (!socket)
          return reject("Missing socket object");

        try {
          // if there are not rooms then it will create a new one
          if (!this.games.public.length) createPublicGame.call(this, io);
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
    playerJoinGame: function (username, socket, roomId) {
      return new Promise((resolve, reject) => {
        try {
          if (!valiteNickname(username))
            return reject("Invalid username", username);
          if (!socket)
            return reject("Missing socket object");

          // if the room doesnt already exist, it will create one
          // then it will proceed to find the room class object
          const gameRoom = _.find(this.games.public, { name: roomId });
          if (!gameRoom) return reject('game doesnt exist dude');

          // player joins the private room created ...
          const player = new Player(username, socket);
          player.joinGameRoom(gameRoom)
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
     * 
     */
    playerLeaveRoom: function (player) {
      const roomId = player.gameroom.name;

      player.leaveGameRoom();
      if (isRoomEmpty(player.gameroom)) deleteRoom.call(this, roomId);
    }
  };
};

module.exports = gameManager;
