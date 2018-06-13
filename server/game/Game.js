'use strict';

const _ = require('lodash');
const { SOCKET_EVENTS } = require('.././socket/events');

class Game {
    constructor(name, io) {
        this.name = name;
        this.io = io;
        this.players = [];
        this.currentWord;
        this.currentPlayer;
        this.scores = [];
    }

    /**
     * 
     * @param {*} username 
     * @param {*} msg 
     */
    playerSendsMessage(username, msg) {
        this.io.to(this.name).emit('newMessage', `${username}: ${msg}`);
    }

    /**
     * 
     * @param {*} id 
     * @param {*} username 
     */
    informsPlayerJoined(id, username) {
        this.players.push({ id, username });
        this.updateChatlist();
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_NEW_MESSAGE, `${username} has joined`);
    }

    /**
     * 
     * @param {*} id 
     */
    informsPlayerLeft(id) {
        const playerToRemove = this.players.find(player => {
            return player.id == id;
        });

        if (!playerToRemove) return;

        _.remove(this.players, player => player.id == playerToRemove.id);

        this.updateChatlist();

        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_NEW_MESSAGE, `${playerToRemove.username} has left`);
    }

    /**
     * 
     */
    updateChatlist() {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, this.players);
    }
}

module.exports = Game;