'use strict';

const _ = require("lodash");

const Chat = require("../chat");

const { changeGamePlay, createNewCanvas, requestRandomWord, persistDrawToDisk } = require("./services");
const { SOCKET_EVENTS } = require("../../events");
const CHAT_CONF = require("../config/chat_conf");
const { GAME_STATE } = require("../config/constants");
const { getRandomColor, isBlank } = require("../../utils");


const GAME_CONFIG  = require("../config/room");

/**
 * Class Game 
 * Contains all the logic to make a game start
 */
class Room {
  constructor(name, io, type) {
    this.type = type || 'public';
    this.name = name;
    this.io = io;
    this.players = [];
    this.draws = [];
    this.currentWord = null;
    this.currentPlayer;
    this.scores = [];
    this.chatRoom = new Chat(this.io, this.name);
    this.timer = null;
    this.gamePlay = GAME_STATE.WAITING;

    this.init();
  }

  /**
   * 
   */
  init() {
    this.io.emit(SOCKET_EVENTS.RETRIEVE_GAME_INFO, {
      roomTag: this.name
    });
  }

  /**
   * PLAYING TIME - 
   */
  start() {
    this.currentWord = requestRandomWord();
    this.io.emit(SOCKET_EVENTS.CURRENT_WORD, this.currentWord);
    changeGamePlay.call(this, GAME_STATE.PLAYING, GAME_CONFIG.TIME_PLAYING_COUNTDOWN, this.vote);
  }

  /**
   * VOTE TIME - 
   */
  vote() {
    const drawsBase64 = this.draws.map(draw => {
      persistDrawToDisk(draw.canvas.getImageData());
      return draw.canvas.getImageData();
    });

    this.io.to(this.name).emit(SOCKET_EVENTS.DISPLAY_ALL_DRAWS, drawsBase64);

    changeGamePlay.call(this, GAME_STATE.VOTING, GAME_CONFIG.TIME_VOTING_COUNTDOWN, this.start);
  }

  /**
   * Takes player requests and proccess either to accept or cancel it
   * @param {Object} player - Player class
   */
  requestJoin(player) {
    const userColor = getRandomColor();

    return new Promise((resolve, reject) => {
      if (this.players.length == process.env.MAX_PLAYERS_PER_ROOM)
        return reject("5 PLAYER MAX PER ROOM");

      player.socket.join(this.name);
      player.color = userColor;

      this.players.push(player);
      this.draws.push(createNewCanvas(player.id));

      this.updatePlayerJoined(player.name);
    
      // start game 10s
      if (this.gamePlay === GAME_STATE.WAITING 
          && this.players.length === GAME_CONFIG.MIN_PLAYERS_START_GAME)  
          changeGamePlay.call(this, GAME_STATE.STARTING, GAME_CONFIG.TIME_STARTING_COUNTDOWN, this.start);

      resolve();
    });
  }

  /**
   * Updates all the room's players canvas
   * @param {Array} data
   */
  updateCanvas(socket, drawingInfo) {

    const { id } = socket ;
    var canvas = _.find(this.draws, { id }).canvas;

    if(socket && this.gamePlay === GAME_STATE.PLAYING) {

      canvas.draw(drawingInfo);
      return socket.emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);

    }

    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);
  }

  /**
   * 
   */
  updateGameState() {
    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_GAME_STATE, this.gamePlay);
  }

  /**
   * Clears player's canvas
   */
  clearPlayerCanvas(socket) {
    this.updateCanvas(socket, { toolPicked: "bin" });
  }

  /**
   * Shows the message the player sent to the whole room
   * @param {String} username
   * @param {String} msg
   */
  playerSendsMessage(id, msg) {
    if(isBlank(msg) || msg.length > CHAT_CONF.MAX_MESSAGE_LENGTH || !id) return;

    const player = _.find(this.players, { id });
    const filterPlayer = {
      name: player.name,
      color: player.color,
      avatar: player.avatar
    };

    this.chatRoom.sendMessageToAll(filterPlayer, msg);
  }

  /**
   * Informs the chatlist that a new player joinned the room
   * @param {Number} id
   * @param {String} username
   */
  updatePlayerJoined(username) {
    this.updateChatlist();
    this.chatRoom.informPlayerJoined(username);
  }

  /**
   * Informs the chatlist that a new player left the room
   * @param {Number} id
   */
  informsPlayerLeft(id) {
    const playerToRemove = _.find(this.players, { id });

    if (!playerToRemove) return;

    _.remove(this.players, player => player.id == playerToRemove.id);
    _.remove(this.draws, draw => draw.id == playerToRemove.id);

    this.updateChatlist();

    this.chatRoom.informPlayerLeft(playerToRemove.name);
  }

  /**
   * Updates all the room's players their userlist
   */
  updateChatlist() {
    const playerList = _.map(
      this.players,
      _.partialRight(_.pick, ["name", "color", "avatar"])
    );
    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, playerList);
  }
}

module.exports = Room;
