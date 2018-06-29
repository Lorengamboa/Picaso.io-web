'use strict';

const startServer = require("./server");
const { socketController } = require("./socket");

/**
 * Sets up the server
 */
const createServer = http => {
    socketController.init(http)
    startServer(http);
}

module.exports = createServer;
