'use strict';

const SOCKET_EVENTS = {
    PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom',
    PLAYER_LEAVE_GAMEROOM: 'leaveGameRoom',
    PLAYER_SEND_MESSAGE: 'sendMessage',
    PLAYER_DRAWING: 'drawing',
    UPDATE_CHAT_PLAYER_MESSAGE: 'playerMessage',
    UPDATE_CHAT_INFORM_MESSAGE: 'generalMessage',
    UPDATE_USER_LIST: 'updateUserList',
    CLEAR_CANVAS: 'clearCanvas',
    UPDATE_CANVAS: 'updateCanvas',
    UPDATE_TIMER: 'updateTimer',
    UPDATE_GAME_STATE: 'updateGameState',
    DISPLAY_PLAYERS_DRAW: 'playerDraws',
};

export default SOCKET_EVENTS;