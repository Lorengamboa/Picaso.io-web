"use strict";

const _ = require("lodash");

const Socket = require("../Socket");
const Chat = require("../chat");
const Voter = require("./classes/Voter");
const events = require("./pubsub/events");
const { requestRandomWord, persistDraw } = require("./services");
const CanvasFactory = require("./CanvasFactory");
const { SOCKET_EVENTS } = require("../../constants/socket-events");
const { GAME_STATE } = require("../config/constants");
const { PlayerJoinRoomError } = require("./error/GenericRoomErrors");
const error_codes = require("./error/codes");
const { getRandomColor } = require("../../utils");
const Timer = require("./classes/Timer");

const GAME_CONFIG = require("../config/room");

/**
 * @class Room
 * @desc Contains all the logic to make a game start
 */
class Room extends Socket {
  constructor(name, io, type, pass) {
    super(io, name);
    this.type = type || "public";
    this.password = pass || null;
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
   * @desc starting point
   */
  init() {
    this.currentWord = requestRandomWord();
    this.timer = Timer();
    this.chatRoom = new Chat(this.io, this.name);
    this.voters = new Voter();
  }

  /**
   * @desc function controller that manages the game flow
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
   * @desc goes to the next game round
   */
  addRound() {
    this.round += 1;
  }

  /*********************************************************************************/
  /*                          GAME GENERAL ACTIONS                                  */
  /*********************************************************************************/

  /**
   * @desc Takes player requests and proccess either to accept or cancel it
   * @param {Object} player - Player class
   */
  requestJoin(player) {
    const userColor = getRandomColor();

    return new Promise((resolve, reject) => {
      try {
        if (this.players.length >= GAME_CONFIG.MAX_PLAYERS_PER_ROOM)
          return reject(
            new PlayerJoinRoomError("Room is full", error_codes.FULL)
          );

        player.socket.join(this.name);
        player.color = userColor;

        this.players.push(player);
        this.draws.push(CanvasFactory(player.id));
        this.voters.addPlayer(player.id);

        this.updatePlayerJoined(player.name);
        this.manageFlow();

        player.socket.emit(SOCKET_EVENTS.RETRIEVE_GAME_INFO, {
          roomTag: this.name
        });

        player.setInactivityTimeout();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * @desc Players leaves room!
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
   * @desc Updates all the room's players canvas
   * @param {Array} data
   */
  updateCanvas(player, drawingInfo) {
    const { socket, id } = player;
    var playedDraw = _.find(this.draws, { id });
    if(!playedDraw) return;

    var { canvas } = playedDraw;

    if (socket && this.status === GAME_STATE.PLAYING) canvas.draw(drawingInfo);
    else socket.broadcast.to(this.name).emit(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo);
  }

  /**
   * @desc Updates client game state
   */
  updateGameState() {
    this.newCurrentWord = requestRandomWord();
    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_GAME_STATE, this.status);
    if (this.status === GAME_STATE.PLAYING) {
      this.io
        .to(this.name)
        .emit(SOCKET_EVENTS.CURRENT_WORD, this.newCurrentWord);
      this.chatRoom.informGeneralActivity(
        `Word to draw: ${this.newCurrentWord}`,
        "purple"
      );
    }
  }

  /**
   * @desc Clears player's canvas
   */
  clearPlayerCanvas(player) {
    this.updateCanvas(player, { toolPicked: "bin" });
  }

  /**
   * @desc Updates all the room's players their userlist
   */
  updateChatlist() {
    let playerList = this.players.map(player => {
      const points = this.voters.draws[player.id].points;
      return (player.points = points);
    });

    playerList = _.map(
      this.players,
      _.partialRight(_.pick, ["name", "color", "avatar", "points", "device"])
    );

    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_USER_LIST, playerList);
  }

  /**
   * @desc Informs the chatlist that a new player joinned the room
   * @param {Number} id
   * @param {String} username
   */
  updatePlayerJoined(username) {
    this.updateChatlist();
    this.chatRoom.informPlayerJoined(username);
  }

  /**
   * @desc Informs the chatlist that a new player left the room
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
  playerSendsMessage(socket, msg) {
    const id = socket.id;
    // if (msg.length > CHAT_CONF.MAX_MESSAGE_LENGTH) return socket.emit("costum_error", 40);
    // else if (isBlank(msg)) return socket.emit("costum_error", 50)
    // else if(!id) return socket.emit("costum_error", 1000);
    const player = _.find(this.players, { id });
    const filterPlayer = {
      name: player.name,
      color: player.color,
      avatar: player.avatar
    };

    this.chatRoom.sendMessageToAll(filterPlayer, msg);
  }

  /**
   * @desc player makes a vote on other player's canvas draw
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
  /*                         GAME STATUS INTERFACE                                 */
  /*********************************************************************************/
  /* 1. Start                                                                      */
  /* 2. Play                                                                       */
  /* 3. Pause                                                                      */
  /* 4. Presentante                                                                */
  /* 5. Vote                                                                       */
  /* 6. Finish                                                                     */
  /*********************************************************************************/

  /**
   * @state START
   * @desc
   */
  start() {
    this.emit(events.STARTING);
  }

  /**
   * @state PLAY
   * @desc
   */
  play() {
    this.io.to(this.name).emit(SOCKET_EVENTS.UPDATE_ROUND_COUNTER, this.round);
    if (this.round === GAME_CONFIG.NUMBER_OF_ROUNDS) return this.finish();
    this.voters.resetCache();
    this.emit(events.PLAYING);
    this.addRound();
    this.updateChatlist();
  }

  /**
   * @state PAUSE
   * @desc
   */
  pause() {
    this.emit(events.PAUSE);
  }

  /**
   * @state DISPLAY_WINNERS
   * @desc
   */
  presentate() {
    let winnerList = this.players.map(player => {
      const points = this.voters.cache[player.id].points;
      player.socket.emit(SOCKET_EVENTS.NOTIFY_MESSAGE, points);
      return (player.points = points);
    });

    winnerList = _.map(
      this.players,
      _.partialRight(_.pick, ["name", "color", "avatar", "points"])
    );

    this.io.to(this.name).emit(SOCKET_EVENTS.DISPLAY_WINNERS, winnerList);
    this.emit(events.PRESENTATE);
  }

  /**
   * @state VOTE
   * @desc
   */
  vote() {
    const drawsBase64 = this.draws
      .filter(draw => !draw.canvas.isBlank())
      .map(draw => {
        const imageData = draw.canvas.getImageData();
        const idDraw = draw.id;

        draw.canvas.cleanCanvas();
        persistDraw(imageData);

        return { id: idDraw, imageData };
      });

    // this.voter = new Voter(idDraws);
    this.io.to(this.name).emit(SOCKET_EVENTS.DISPLAY_ALL_DRAWS, drawsBase64);
    this.emit(events.VOTING);
  }

  /**
   * @state FINISH
   * @desc
   */
  finish() {
    this.emit(events.FINISH);
  }
}

module.exports = Room;
