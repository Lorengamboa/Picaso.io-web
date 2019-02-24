const { SOCKET_EVENTS } = require("../../constants/socket-events");

/**
 * 
 */
function attachListeners() {
  // Player is drawing now
  this.socket.on(SOCKET_EVENTS.PLAYER_DRAWING, drawingInfo => {
    this.gameroom.updateCanvas(this.socket, drawingInfo);
  });
  // Clears canvas
  this.socket.on(SOCKET_EVENTS.CLEAR_CANVAS, () => {
    this.gameroom.clearPlayerCanvas(socket);
  });
  // Player sends a msg to the entire chatroom
  this.socket.on(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg => {
    this.gameroom.playerSendsMessage(this.id, msg);
  });
  // Player sends a msg to the entire chatroom
  this.socket.on(SOCKET_EVENTS.PLAYER_SEND_MESSAGE, msg => {
    this.gameroom.playerSendsMessage(this.id, msg);
  });
  // Player votes for a specific draw
  this.socket.on(SOCKET_EVENTS.PLAYER_VOTES_DRAW, (data) => {
    const { draw, feedback } = data;
    this.gameroom.playerVoteDraw(this.id, draw, feedback);
  });
}


module.exports = attachListeners;