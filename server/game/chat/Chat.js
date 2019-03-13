'use strict';

var Filter = require('bad-words/lib/badwords');

const Socket = require('../Socket');
const MESSAGE_CONF = require('../config/chat_conf');
const { SOCKET_EVENTS } = require('../../constants/socket-events');

const filter = new Filter();

/**
 * Chat class
 * Class in charge of managing the messages flow
 */
class Chat extends Socket{
    constructor(io, name) {
        super(io,name);
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
            msg,
            userColor: player.color,
            avatar: player.avatar
        });
    }
    
    /**
     * 
     * @param {*} data 
     * @param {*} color 
     */
    informGeneralActivity(data, color) {
        this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CHAT_INFORM_MESSAGE, {
            type:'general', data, color
        });
    }

    /**
     * Informs the chatlist that a new player joinned the room
     * @param {String} username 
     */
    informPlayerJoined(username) {
        this.informGeneralActivity(`${username} has joined`, '#28de46')
    }

    /**
     * Informs the chatlist that a new player left the room
     * @param {String} username 
     */
    informPlayerLeft(username) {
        this.informGeneralActivity(`${username} has left`, 'red')
    }
}

module.exports = Chat;