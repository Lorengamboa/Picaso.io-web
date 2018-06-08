'use strict';

//load of env conf
require('dotenv').config();

const path = require("path");
const express = require("express");
const app = express();
const server = require("./server");
var http = require('http').Server(app);
var io = require('socket.io')(http);

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


//
// SOCKETS CONNECTION
// -----------------------------------------------------------------------------
io.on('connection', function(socket){
  
  //
  socket.on('connectAnyLobby', function(msg){
  });

  //
  socket.on('leaveLobby', function(msg){
  });

  //
  socket.on('postMessage', function(msg){
    io.emit('updateChat', msg);
  });

  //
  socket.on('drawCanvas', function(msg){
  });

  //
  socket.on('clearCanvas', function(msg){
  });

  //
  socket.on('voteKickCurrentPlayer', function(msg){
  }); 
});

server(http);

