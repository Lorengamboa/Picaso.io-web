const winston = require("winston");

const TransportFactory = function(filename) {
  return new winston.transports.DailyRotateFile({
    dirname: "logs",
    filename: `${filename}-%DATE%.log`,
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
  });
};

module.exports = TransportFactory;