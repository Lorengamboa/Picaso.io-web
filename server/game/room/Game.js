'use strict';

const _ = require('lodash');
const Chat = require('../chat');
const { SOCKET_EVENTS } = require('../../socket/events');
const Timer = require('./Timer');
const { getRandomColor } = require('../../utils');

/**
 * Class Game
 * Contains all the logic to make a game start
 */
class Game {
    constructor(name, io) {
        this.name = name;
        this.io = io;
        this.players = [];
        this.currentWord;
        this.currentPlayer;
        this.scores = [];
        this.chatRoom = new Chat(this.io, this.name);
        this.timer = null;
    }

    /**
     * Takes player requests and proccess either to accept or cancel it
     * @param {Object} player - Player class
     */
    requestJoin(player) {
        return new Promise((resolve, reject) => {
            if (this.players.length == process.env.MAX_PLAYERS_PER_ROOM) return reject("5 PLAYER MAX PER ROOM");

            player.socket.join(this.name);

            const userColor = getRandomColor();
            player.color = userColor;

            this.players.push(player);

            this.updatePlayerJoined(player.name);


            // start game 10s
            if (this.players.length == process.env.MAX_PLAYERS_PER_ROOM) Timer.startCountdown(10);

            resolve();
        });

    }

    /**
     * Updates all the room's players canvas
     * @param {Array} data 
     */
    updateCanvas(drawing, color) {
        this.io.to(this.name).emit('updateCanvas', { drawing, color });
    }

    /**
     * Shows the message the player sent to the whole room
     * @param {String} username 
     * @param {String} msg 
     */
    playerSendsMessage(id, msg) {
        const player = _.find(this.players, { id });
        const filterPlayer = {
            name: player.name,
            color: player.color
        };

        this.chatRoom.sendMessageToAll(filterPlayer, msg);
    }

    /**
     * Informs the chatlist that a new player joinned the room
     * @param {Number} id 
     * @param {String} username 
     */
    updatePlayerJoined(username) {
        this.updateChatlist();
        this.chatRoom.informPlayerJoined(username);
    }

    /**
     * Informs the chatlist that a new player left the room
     * @param {Number} id 
     */
    informsPlayerLeft(id) {
        const playerToRemove = _.find(this.players, { id });

        if (!playerToRemove) return;

        _.remove(this.players, player => player.id == playerToRemove.id);

        this.updateChatlist();

        this.chatRoom.informPlayerLeft(playerToRemove.name);
    }

    /**
     * Updates all the room's players their userlist
     */
    updateChatlist() {
        const playerList = _.map(this.players, _.partialRight(_.pick, ['name', 'color']));
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, playerList);
    }
}

module.exports = Game;