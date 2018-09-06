"use strict";
const _ = require('lodash');

const { createPublicGame, createPrivateGame } = require('./createNewGame');
const Player = require("./Player");
const {
  rndValueArray,
  valiteNickname
} = require("../utils");

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
     * @description: Player joins a public(random) game room
     * @param {*} username 
     * @param {*} socket 
     */
    playerJoinRandomGame: function (username, socket) {
      return new Promise((resolve, reject) => {
        if (!valiteNickname(username))
          return reject("Invalid username", username);
        if (!socket)
          return reject("Missing socket object");

        try {
          // if there are not rooms then it will create a new one
          if (!this.games.public.length) createPublicGame.call(this, io);
          // from all the rooms created, selects one
          const gameRoom = rndValueArray(this.games.public);
          // creates new user (Player)
          const player = new Player(username, socket);

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
     * @description: player join a private game room
     * @param {*} username 
     * @param {*} socket 
     * @param {*} roomId 
     */
    playerJoinPrivateGame: function (username, socket, roomId) {
      return new Promise((resolve, reject) => {
        try {
          if (!valiteNickname(username))
            return reject("Invalid username", username);
          if (!socket)
            return reject("Missing socket object");

          // if the room doesnt already exist, it will create one
          // then it will proceed to find the room class object
          const doesRoomAlreadyExists = _.find(this.private, { name: roomId });
          if (!doesRoomAlreadyExists) createPrivateGame.call(this, roomId, io);
          const gameRoom = _.find(this.games.private, { name: roomId });

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
    }
  };
};

module.exports = gameManager;
