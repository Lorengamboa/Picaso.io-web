"use strict";

const _ = require("lodash");

const Socket = require("../Socket");
const Chat = require("../chat");
const Voter = require("./utils/Voter");
const events = require("../controllers/room/events");
const { requestRandomWord, persistDraw } = require("./services");
const GameFactory = require("./GameFactory");
const { SOCKET_EVENTS } = require("../../constants/socket-events");
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
    this.chatRoom = null;
    this.voters = null;
    this.round = 0;
    this.timer = null;
    this.status = GAME_STATE.WAITING;

    this.init();
  }

  /**
   * Init function
   */
  init() {
    this.currentWord = requestRandomWord();
    this.timer = Timer();
    this.chatRoom = new Chat(this.io, this.name);
    this.voters = new Voter();
  }

  /**
   *
   */
  manageFlow() {
    if (
      this.status === GAME_STATE.WAITING &&
      this.players.length === GAME_CONFIG.MIN_PLAYERS_START_GAME
    )
      return this.start();

    if (
      this.status === GAME_STATE.PAUSED &&
      this.players.length === GAME_CONFIG.MIN_PLAYERS_START_GAME
    )
      return this.start();
    if (
      this.status !== GAME_STATE.WAITING &&
      this.players.length < GAME_CONFIG.MIN_PLAYERS_START_GAME
    )
      return this.pause();
  }

  /**
   *
   */
  addRound() {
    this.round += 1;
  }

  /*********************************************************************************/
  /*                        GAME GENERAL ACTIONS                                   */
  /*********************************************************************************/

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
      this.draws.push(GameFactory(player.id));
      this.voters.addPlayer(player.id);

      this.updatePlayerJoined(player.name);
      this.manageFlow();
      player.socket.emit(SOCKET_EVENTS.RETRIEVE_GAME_INFO, {
        roomTag: this.name
      });
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
        this.manageFlow();
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

    if (socket && this.status === GAME_STATE.PLAYING) {
      canvas.draw(drawingInfo);
      return socket.emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);
    }

    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);
  }

  /**
   * Updates client game state
   */
  updateGameState() {
    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_GAME_STATE, this.status);
  }

  /**
   * Clears player's canvas
   */
  clearPlayerCanvas(socket) {
    this.updateCanvas(socket, { toolPicked: "bin" });
  }

  /**
   * Updates all the room's players their userlist
   */
  updateChatlist() {

    let playerList = this.players.map(player => {
      const points = this.voters.draws[player.id].points;
      return player.points = points;
    });

    playerList = _.map(
      this.players,
      _.partialRight(_.pick, ["name", "color", "avatar", "points"])
    );

    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, playerList);
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
    _.remove(this.votes, voter => voter.id == playerToRemove.id);

    this.updateChatlist();

    this.chatRoom.informPlayerLeft(playerToRemove.name);
  }

  /*********************************************************************************/
  /*                          PLAYER ACTIONS                                       */
  /*********************************************************************************/

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
   *
   * @param {*} id
   * @param {*} draw
   * @param {*} feedback
   */
  playerVoteDraw(socket, draw, feedback) {
    if (socket === draw) return;

    //
    if (_.find(this.draws, { id: draw })) {
      this.voters.rateDraw(socket, draw, feedback);
    }
  }

  /*********************************************************************************/
  /*                        GAME STATUS INTERFACE                                  */
  /*********************************************************************************/
  /* 1. Start                                                                      */
  /* 2. Play                                                                       */
  /* 3. Pause                                                                      */
  /* 4. Vote                                                                       */
  /* 5. Finish                                                                     */
  /*********************************************************************************/

  /**
   * GAME STATE: START
   */
  start() {
    this.emit(events.STARTING);
  }

  /**
   * GAME STATE: PLAY
   */
  play() {
    if (this.round === GAME_CONFIG.NUMBER_OF_ROUNDS) return this.finish();

    this.io.to(this.name).emit(SOCKET_EVENTS.CURRENT_WORD, this.currentWord);
    this.emit(events.PLAYING);
    this.addRound();
    this.updateChatlist();
  }

  /**
   * GAME STATE: PAUSE
   */
  pause() {
    this.emit(events.PAUSE);
  }

  /**
   * GAME STATE: VOTE
   */
  vote() {
    const drawsBase64 = this.draws
      .filter(draw => !draw.canvas.isBlank())
      .map(draw => {
        const imageData = draw.canvas.getImageData();
        const idDraw = draw.id;

        persistDraw(imageData);

        return { id: idDraw, imageData };
      });

    // this.voter = new Voter(idDraws);
    this.io.to(this.name).emit(SOCKET_EVENTS.DISPLAY_ALL_DRAWS, drawsBase64);
    this.emit("vote");
  }

  /**
   * GAME STATE: FINISH
   */
  finish() {
    this.emit(events.FINISH);
  }
}

module.exports = Room;
