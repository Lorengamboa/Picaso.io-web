'use strict';

const spawn = require("child_process").spawn;
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require("connect-mongo")(session);

const logger = require("./config/logger");
const socketManager = require("./server/socket/index");

const app = express();

const pipe = spawn("mongod", ["--dbpath=<LOCATION>", "--port", "<PORT>"]);

var url = "mongodb://localhost:27017/dev"; // mydatabase is the name of db 
MongoClient.connect(url, function(err, db) {
  if (err) return logger.server.error("MONGODB connection error" + err);;
  logger.server.info("MONGODB connection succesfull");
  db.close();
});

// connect to MongoDB
mongoose.connect(url)
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

// app use
app.use(express.static(path.join(__dirname, "public")));
//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   logger.server.warn("Sorry cant find that!");
//   res.status(404).send("Sorry cant find that!");
// });

// // 500 error handler
// app.use(function(err, req, res, next) {
//   logger.server.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// starting http server
const server = require("./server")(app);
const io = require("socket.io").listen(server, { log: false });
const gmctrl = socketManager.init(io);

//routes
require("./server/router")(app, gmctrl);
