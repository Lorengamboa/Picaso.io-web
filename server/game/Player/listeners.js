const Joi = require('joi');
const { SOCKET_EVENTS } = require("../../constants/socket-events");
const socketSchema = require("./schemas/message");
const drawSchema = require("./schemas/draw");


/**
 * Player action events
 */
function attachListeners() {
  // Player is drawing now
  this.socket.on(SOCKET_EVENTS.PLAYER_DRAWING, drawingInfo => {
    setImmediate(() => {
      const result = Joi.validate(drawingInfo, drawSchema);

      if(result.error !== null) return;

      this.gameroom.updateCanvas(this, drawingInfo);
      this.setInactivityTimeout();
    });
  });
  // Clears canvas
  this.socket.on(SOCKET_EVENTS.CLEAR_CANVAS, () => {
    setImmediate(() => {
      this.gameroom.clearPlayerCanvas(this);
    });
  });
  // Player sends a msg to the entire chatroom
  this.socket.on(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg => {
    setImmediate(() => {
      const result = Joi.validate(msg, socketSchema);
      if(result.error !== null) return;
      this.gameroom.playerSendsMessage(this.socket, msg);
    });
  });
  // Player votes for a specific draw
  this.socket.on(SOCKET_EVENTS.PLAYER_VOTES_DRAW, data => {
    setImmediate(() => {
      const { draw, feedback } = data;
      this.gameroom.playerVoteDraw(this.id, draw, feedback);
    });
  });
  // Becomes drunk
  this.socket.once(SOCKET_EVENTS.DRINK_VODKA, () => {
    setImmediate(() => {
      this.drunk = true;
    });
  });
}

module.exports = attachListeners;
