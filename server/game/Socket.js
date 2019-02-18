const EventEmitter = require("events");

/**
 * 
 */
class Socket extends EventEmitter {
    constructor(io, name){
        super();
        this.io = io;
        this.name = name;
    }
}

module.exports = Socket;