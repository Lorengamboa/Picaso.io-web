'use strict'

module.exports.SOCKET_EVENTS = {
  RETRIEVE_GAME_INFO: 'retrieveGameInfo',
  CONNECT: 'connection',
  CONNECTION_RESULT: "connectionResult",
  PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom',
  PLAYER_JOIN_PRIVATE_GAMEROOM: 'joinPrivateRoom',
  PLAYER_CREATES_GAME: 'playerCreatesGame',
  PLAYER_LEAVE_GAMEROOM: 'leaveGameRoom',
  PLAYER_SEND_MESSAGE: 'sendMessage',
  PLAYER_DRAWING: 'drawing',
  PLAYER_VOTES_DRAW: 'playerVotesDraw',
  DISCONNECT: 'disconnect',
  UPDATE_CHAT_PLAYER_MESSAGE: 'playerMessage',
  UPDATE_CHAT_INFORM_MESSAGE: 'generalMessage',
  UPDATE_USER_LIST: 'updateUserList',
  CLEAR_CANVAS: 'clearCanvas',
  UPDATE_CANVAS: 'updateCanvas',
  UPDATE_TIMER: 'updateTimer',
  UPDATE_GAME_STATE: 'updateGameState',
  DISPLAY_ALL_DRAWS: 'playerDraws',
  CURRENT_WORD: 'currentWord',
  AVAILABLE_GAMES: 'availableGames',
}