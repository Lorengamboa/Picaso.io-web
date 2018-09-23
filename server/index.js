'use strict'

const startServer = require('./server')

/**
 * Sets up the server
 */
const createServer = app => {
  return startServer(app);
}

module.exports = createServer;
