"use strict";

const logger = require("../config/logger");
const PORT = process.env.PORT || 8080;

/**
 * Starts server
 * @param {*} http
 */
const startServer = http => {
  return http.listen(PORT, () => {
    logger.info(
      `${process.env.NODE_ENV}, Picaso.io App listening on port ${PORT}`
    );
  });
};

module.exports = startServer;
