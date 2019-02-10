"use strict";

const logger = require("../logger");
const PORT = process.env.PORT;

/**
 * Starts server
 * @param {*} http
 */
const startServer = http => {
  return http.listen(PORT, () => {
    logger.server.info(
      `${process.env.NODE_ENV}, Picaso.io App listening on port ${PORT}`
    );
  });
};

module.exports = startServer;
