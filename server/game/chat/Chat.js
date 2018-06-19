'use strict';

var Filter = require('bad-words');
const { SOCKET_EVENTS } = require('../../socket/events');

const filter = new Filter();

/**
 * Chat class
 */
class Chat {
    constructor(io, name) {
        this.io = io;
        this.name = name;
    }

    /**
     * SenDs a message to the whole chatroom
     * @param {*} username 
     * @param {*} msg 
     */
    sendMessageToAll(username, msg) {
        const filterMessage = filter.clean(msg); //FOR FUCK SAKE NO SWEARING HERE BOY!
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_NEW_MESSAGE, `${username}: ${filterMessage}`);
    }

    /**
     * Informs the chatlist that a new player joinned the room
     * @param {Number} id 
     * @param {String} username 
     */
    informPlayerJoined(username) {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE,  {
            data: `${username} has joined`,
            color: 'green'
        });
    }

    /**
     * Informs the chatlist that a new player left the room
     * @param {Number} id 
     */
    informPlayerLeft(username) {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, {
            data: `${username} has left`,
            color: 'red'
        });
    }
}

 module.exports = Chat;