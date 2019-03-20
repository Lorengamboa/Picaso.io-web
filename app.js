'use strict';

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// const database = require("./services/mongo");
const logger = require("./logger");
const socketManager = require("./server/services/socket-service");

const app = express();

app.set('views', path.join(__dirname, 'server/templates'));
app.set('view engine', 'pug');
// app use
//use sessions for tracking logins
// app.use(
//   session({
//     secret: "work hard",
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//       mongooseConnection: database
//     })
//   })
// );

// parse incoming requests
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
