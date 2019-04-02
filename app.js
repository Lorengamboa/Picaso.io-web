"use strict";

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const logger = require("./logger");
const socketManager = require("./server/services/socket-service");

const app = express();

app.set("views", path.join(__dirname, "server/templates"));
app.set("view engine", "pug");

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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
