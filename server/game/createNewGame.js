'use strict';

const Room = require("./room/Room");
const {
    createRandomString
  } = require(".././utils");

/**
 * 
 * @param {*} io 
 */
const createPublicGame = function(io) {
    const roomName = createRandomString();
    const game = new Room(roomName, io);
    this.games.public.push(game);
};

/**
 * 
 * @param {*} roomId 
 * @param {*} io 
 */
const createPrivateGame = function(roomId, io) {
    const game = new Room(roomId, io, 'private');
    this.games.private.push(game);
};

module.exports = { createPublicGame, createPrivateGame };