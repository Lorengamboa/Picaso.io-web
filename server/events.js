'use strict'

module.exports.SOCKET_EVENTS = {
  CONNECT: 'connection',
  PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom',
  PLAYER_LEAVE_GAMEROOM: 'leaveGameRoom',
  PLAYER_SEND_MESSAGE: 'sendMessage',
  PLAYER_DRAWING: 'drawing',
  DISCONNECT: 'disconnect',
  UPDATE_CHAT_PLAYER_MESSAGE: 'playerMessage',
  UPDATE_CHAT_INFORM_MESSAGE: 'generalMessage',
  UPDATE_USER_LIST: 'updateUserList',
  CLEAR_CANVAS: 'clearCanvas',
  UPDATE_CANVAS: 'updateCanvas',
  UPDATE_GAME_STATE: 'updateGameState',
  DISPLAY_ALL_DRAWS: 'playerDraws',
  CURRENT_WORD: 'currentWord'
}
