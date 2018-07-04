'use strict';

const startServer = require("./server");
const socketManager = require("./socket");

/**
 * Sets up the server
 */
const createServer = http => {
    socketManager.init(http)
    startServer(http);
}

module.exports = createServer;
