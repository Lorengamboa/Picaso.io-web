'use strict';

const path = require("path");
const express = require("express");
const app = express();

const API = require('./server/API/router');

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

/*
 * SERVER HTTP ENDPOINTS
 */

 // HOME PICASIO.IO HOME SITE
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// JOIN A CERTAIN GAME ALREADY CREATED
app.get('/game/:id', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

//
app.get('/play', function(request, response) {
  response.redirect('/');
});

//
app.get('/admin', function(request, response) {
  response.sendFile(__dirname + '/public/admin/starter.html');
});

// API SERVICE
app.use('/api', API);

// NOT FOUND
app.get('*', function(request, response) {
  response.sendStatus("404");
});

module.exports = app;