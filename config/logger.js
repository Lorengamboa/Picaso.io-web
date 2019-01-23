const winston = require("winston");

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
    new winston.transports.File({ filename: "local_server.log" })
  ]
});

module.exports = logger;