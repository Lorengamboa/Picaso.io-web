'use strict';

/**
 * SOCKET POSSIBLE EVENTS
 */
module.exports.SOCKET_EVENTS = {
    CONNECT: 'connection',
    PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom',
    PLAYER_LEAVE_GAMEROOM: 'leaveGameRoom',
    PLAYER_SEND_MESSAGE: 'sendMessage',
    PLAYER_DRAWING: 'drawing',
    DISCONNECT: 'disconnect',
    UPDATE_CHAT_NEW_MESSAGE: 'newMessage',
    UPDATE_CHAT_INFORM_MESSAGE: 'informMessage',
    UPDATE_USER_LIST: 'updateUserList'
};
