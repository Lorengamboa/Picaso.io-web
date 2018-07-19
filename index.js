'use strict';

//load of env conf
require('dotenv').config();

const http = require('http');

const server = require("./server");
const expressApp = require("./app");

const app = http.Server(expressApp)

server(app);

