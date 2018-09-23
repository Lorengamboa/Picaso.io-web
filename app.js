'use strict';

const path = require("path");
const express = require("express");
const app = express();
const socketManager = require('./server/socket/index');

app.use(express.static(path.join(__dirname, 'public')));

// starting http server
const server = require('./server')(app);

var io = require('socket.io').listen(server, { log: false });

const gmctrl = socketManager.init(io);

//routes
require('./server/routes')(app, gmctrl);
