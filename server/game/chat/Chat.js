'use strict';

var Filter = require('bad-words');
const { SOCKET_EVENTS } = require('../../socket/events');

const filter = new Filter();

/**
 * Chat class
 * Class in charge of managing the messages flow
 */
class Chat {
    constructor(io, name) {
        this.io = io;
        this.name = name;
    }

    /**
     * SenDs a message to the whole chatroom
     * @param {String} player 
     * @param {String} msg 
     */
    sendMessageToAll(player, msg) {
        const filterMessage = filter.clean(msg);
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_NEW_MESSAGE, {
            msg: `${player.name}: ${filterMessage}`,
            userColor: player.color
        });
    }

    /**
     * Informs the chatlist that a new player joinned the room
     * @param {String} username 
     */
    informPlayerJoined(username) {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, {
            data: `${username} has joined`,
            color: '#28de46'
        });
    }

    /**
     * Informs the chatlist that a new player left the room
     * @param {String} username 
     */
    informPlayerLeft(username) {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, {
            data: `${username} has left`,
            color: 'red'
        });
    }
}

module.exports = Chat;