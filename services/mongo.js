
const spawn = require("child_process").spawn;
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

const logger = require("../logger");

spawn("mongod", ["--dbpath=<LOCATION>", "--port", "<PORT>"]);

MongoClient.connect(process.env.DATABASE_HOST_DEV, function(err, db) {
  if (err) return logger.server.error("MONGODB connection error" + err);;
  logger.server.info("MONGODB connection succesfull");
  db.close();
});

// connect to MongoDB
mongoose.connect(process.env.DATABASE_HOST_DEV)
.catch((err) => {
  logger.server.error("MONGODB connection error" + err);
});

var db = mongoose.connection;

//
db.on("error", function() {
  logger.server.error("MONGODB connection error");
});

//
db.once("open", function() {
  logger.server.info("MONGODB connection succesfull");
});

module.exports = db;