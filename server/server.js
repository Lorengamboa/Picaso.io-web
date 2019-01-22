"use strict";

const winston = require("winston");
const PORT = process.env.PORT || 8080;

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} - ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        myFormat
      )
    }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

/**
 *
 * @param {*} http
 */
const startServer = http => {
  return http.listen(PORT, () => {
    logger.warn(
      `${process.env.NODE_ENV}, Picaso.io App listening on port ${PORT}`
    );
  });
};

module.exports = startServer;
