'use strict';

const Emitter = socket => {
  this.socket = socket;
};

Emitter.prototype.sendMessage = () => {};
Emitter.prototype.joinRandomRoom = () => {};
Emitter.prototype.drawCanvas = () => {};
Emitter.prototype.clearCanvas = () => {};



export default Emitter;
