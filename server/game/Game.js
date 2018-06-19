'use strict';

const _ = require('lodash');
const Chat = require('./chat');
const { SOCKET_EVENTS } = require('.././socket/events');

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
    }

    /**
     * Updates all the room's players canvas
     * @param {*} data 
     */
    updateCanvas(data) {
        this.io.to(this.name).emit('updateCanvas', data);
    }

    /**
     * Shows the message the player sent to the whole room
     * @param {String} username 
     * @param {String} msg 
     */
    playerSendsMessage(username, msg) {
        this.chatRoom.sendMessageToAll(username, msg);
    }

    /**
     * Informs the chatlist that a new player joinned the room
     * @param {Number} id 
     * @param {String} username 
     */
    informsPlayerJoined(id, username) {
        this.players.push({ id, username });
        this.updateChatlist();

        this.chatRoom.informPlayerJoined(username);
    }

    /**
     * Informs the chatlist that a new player left the room
     * @param {Number} id 
     */
    informsPlayerLeft(id) {
        const playerToRemove = this.players.find(player => {
            return player.id == id;
        });

        if (!playerToRemove) return;

        _.remove(this.players, player => player.id == playerToRemove.id);

        this.updateChatlist();

        this.chatRoom.informPlayerLeft(playerToRemove.username);
    }

    /**
     * Updates all the room's players their userlist
     */
    updateChatlist() {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, this.players);
    }
}

module.exports = Game;