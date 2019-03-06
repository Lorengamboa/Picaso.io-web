
class RoomError extends Error {
    constructor(message) {
      super(message);
     // Ensure the name of this error is the same as the class name
      this.name = this.constructor.name;
     // This clips the constructor invocation from the stack trace.
     // It's not absolutely essential, but it does make the stack trace a little nicer.
     //  @see Node.js reference (bottom)
      Error.captureStackTrace(this, this.constructor);
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

  module.exports = {
    RoomNotFoundError,
    InternalError,  
    CreateRoomError
  };