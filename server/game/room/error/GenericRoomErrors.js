
const RoomError = require("./RoomError");
class RoomNotFoundError extends RoomError {
  constructor(resource, query) {
    super(`Resource ${resource} was not found.`);
    this.data = { resource, query };
  }
}

class CreateRoomError extends RoomError {
  constructor(error) {
    super(error.message);
    this.data = { error };
  }
}

class PlayerJoinRoomError extends RoomError {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}

class InternalError extends RoomError {
  constructor(error) {
    super(error.message);
    this.data = { error };
  }
}

module.exports = { RoomNotFoundError, CreateRoomError, PlayerJoinRoomError, InternalError };