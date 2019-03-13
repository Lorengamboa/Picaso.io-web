
class RoomError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  class RoomNotFoundError extends RoomError {
    constructor(resource, query) {
      super(`Resource ${resource} was not found.`);
      this.data = { resource, query };
    }
  }
  
  // I do something like this to wrap errors from other frameworks.
  // Correction thanks to @vamsee on Twitter:
  // https://twitter.com/lakamsani/status/1035042907890376707
  class InternalError extends RoomError {
    constructor(error) {
      super(error.message);
      this.data = { error };
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

  const error_codes = {
    FULL: 0,
    NOT_EXIST: 1,
    BANNED: 2
}

  module.exports = {
    RoomNotFoundError,
    InternalError,  
    CreateRoomError,
    PlayerJoinRoomError,
    error_codes
  };