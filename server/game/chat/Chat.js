'use strict';

var Filter = require('bad-words');
const { SOCKET_EVENTS } = require('../../events');

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
     * Sends a message to the whole chatroom
     * @param {String} player 
     * @param {String} msg 
     */
    sendMessageToAll(player, msg) {
        //const filterMessage = filter.clean(msg);
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_PLAYER_MESSAGE, {
            type: 'player',
            username: player.name,
            message: msg,
            userColor: player.color
        });
    }
    
    /**
     * 
     * @param {*} data 
     * @param {*} color 
     */
    informPlayerActivity(data, color) {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, {
            type:'general', data, color
        });
    }

    /**
     * Informs the chatlist that a new player joinned the room
     * @param {String} username 
     */
    informPlayerJoined(username) {
        this.informPlayerActivity(`${username} has joined`, '#28de46')
    }

    /**
     * Informs the chatlist that a new player left the room
     * @param {String} username 
     */
    informPlayerLeft(username) {
        this.informPlayerActivity(`${username} has left`, 'red')
    }
}

module.exports = Chat;