'use strict';

const _ = require('lodash');
const Chat = require('./chat');
const { SOCKET_EVENTS } = require('.././socket/events');
const { getRandomColor } = require('../utils');

/**
 * Class Game
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
     * 
     * @param {*} player 
     */
    requestJoin(player) {
        return new Promise((resolve, reject) => {
            if (this.players.length == process.env.MAX_PLAYERS_PER_ROOM) return reject("5 PLAYER MAX PER ROOM");

            player.socket.join(this.name);

            const userColor = getRandomColor();
            player.color = userColor;

            this.players.push(player);

            this.updatePlayerJoined(player.name);
            
            /*
            if (this.players.length == process.env.MAX_PLAYERS_PER_ROOM)
                this.timer = setInterval(function (t) {
                    console.log("timer");
                }, 1000);
            */
            resolve();
        });

    }

    /**
     * Updates all the room's players canvas
     * @param {Array} data 
     */
    updateCanvas(data) {
        this.io.to(this.name).emit('updateCanvas', data);
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
        const playerList = _.map(this.players, _.partialRight(_.pick, ['name']));
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, playerList);
    }

    /**
     * 
     */
    timerFunction() {

    }
}

module.exports = Game;