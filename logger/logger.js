const winston = require("winston");
require("winston-daily-rotate-file");

const TransportFactory = require("./Transport");

const format = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }),
  winston.format.simple()
);

const transportFormat = winston.format.printf(info => {
  return `${info.timestamp} - ${info.level}: ${info.message}`;
});

const TransportConsole = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple(),
    transportFormat
  )
});

/*****************************************************************
 *                      LOGGERS                                  *
 ****************************************************************/

/*
 * Socket server transport
 */
const transport_server = TransportFactory("server");

const server = winston.createLogger({
  format,
  transports: [TransportConsole, TransportFactory("server")]
});

transport_server.on("rotate", function(oldFilename, newFilename) {
  // do something fun
});

/*
 * Socket log transport
 */
const transport_sockets = TransportFactory("sockets");

const sockets = winston.createLogger({
  format,
  transports: [TransportConsole, TransportFactory("sockets")]
});

transport_sockets.on("rotate", function(oldFilename, newFilename) {
  // do something fun
});

module.exports = { server, sockets };