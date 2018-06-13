'use strict';

//load of env conf
require('dotenv').config();

const server = require("./server");
const app = require("./app");

const http = require('http').Server(app);

server(http);

