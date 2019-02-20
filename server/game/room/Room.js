"use strict";

const EventEmitter = require("events");
const _ = require("lodash");

const Socket = require('../Socket');
const Chat = require("../chat");

const {
  createNewCanvas,
  requestRandomWord,
  persistDraw
} = require("./services");
const { SOCKET_EVENTS } = require("../../events");
const CHAT_CONF = require("../config/chat_conf");
const { GAME_STATE } = require("../config/constants");
const { getRandomColor, isBlank } = require("../../utils");
const Timer = require("./utils/Timer");

const GAME_CONFIG = require("../config/room");

/**
 * @class Room
 * Contains all the logic to make a game start
 */
class Room extends Socket {
  constructor(name, io, type) {
    super(io, name);
    this.type = type || "public";
    this.players = [];
    this.draws = [];
    this.currentWord = null;
    this.currentPlayer;
    this.scores = [];
    this.chatRoom = new Chat(this.io, this.name);
    this.timer = Timer();
    this.gamePlay = GAME_STATE.WAITING;

    this.init();
  }

  /**
   * Init function
   */
  init() {
    this.currentWord = requestRandomWord();

    // TODO: send game status individually
    this.io.emit(SOCKET_EVENTS.RETRIEVE_GAME_INFO, {
      roomTag: this.name
    });
  }

  /**
   * Takes player requests and proccess either to accept or cancel it
   * @param {Object} player - Player class
   */
  requestJoin(player) {
    const userColor = getRandomColor();
    return new Promise((resolve, reject) => {
      if (this.players.length == process.env.MAX_PLAYERS_PER_ROOM) return reject("5 PLAYER MAX PER ROOM");

      player.socket.join(this.name);
      player.color = userColor;

      this.players.push(player);
      this.draws.push(createNewCanvas(player.id));
      this.updatePlayerJoined(player.name);

      if (this.gamePlay === GAME_STATE.WAITING && this.players.length === GAME_CONFIG.MIN_PLAYERS_START_GAME) this.start();
      resolve();
    });
  }

  /**
   * Players leaves room!
   * @param {*} player 
   */
  requestLeave(player) {
    return new Promise((resolve, reject) => {
      try {
        player.socket.leave(this.name);
        this.informsPlayerLeft(player.id);
        if (this.gamePlay === GAME_STATE.PLAYING && this.players.length < GAME_CONFIG.MIN_PLAYERS_START_GAME) this.pause();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Updates all the room's players canvas
   * @param {Array} data
   */
  updateCanvas(socket, drawingInfo) {
    const { id } = socket;
    var canvas = _.find(this.draws, { id }).canvas;

    if (socket && this.gamePlay === GAME_STATE.PLAYING) {
      canvas.draw(drawingInfo);
      return socket.emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);
    }

    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);
  }

  /**
   * Updates client game state
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
    if (isBlank(msg) || msg.length > CHAT_CONF.MAX_MESSAGE_LENGTH || !id)
      return;

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

    /*********************************************************************************/
   /*                            GAME STATUS                                        */
  /*********************************************************************************/

  /**
   * GAME STATE: START
   */
  start() {
    this.emit('start');
  }

  /**
   * GAME STATE: PLAY
   */
  play() {
    this.io.to(this.name).emit(SOCKET_EVENTS.CURRENT_WORD, this.currentWord);
    this.emit('play');
  }

  /**
   * GAME STATE: PAUSE
   */
  pause() {
    this.emit('pause')  
  }

  /**
   * GAME STATE: VOTE
   */
  vote() {
    const drawsBase64 = this.draws.map(draw => {
      persistDraw(draw.canvas.getImageData());
      return draw.canvas.getImageData();
    });

    this.io.to(this.name).emit(SOCKET_EVENTS.DISPLAY_ALL_DRAWS, drawsBase64);
    this.emit('vote');
  }

}

module.exports = Room;
