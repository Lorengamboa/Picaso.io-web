'use strict';

//load of env conf
require('dotenv').config();

const path = require("path");
const express = require("express");
const app = express();
const server = require("./server");
var http = require('http').Server(app);

//
// 
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//
// 
// -----------------------------------------------------------------------------
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

server(http);

