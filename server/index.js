'use strict';

const socketio = require('socket.io');
const startServer = require("./server");
const startSockets = require("./socket");

/**
 * Sets up the server
 */
const createServer = http => {
    startSockets(http)
    startServer(http);
}

module.exports = createServer;
