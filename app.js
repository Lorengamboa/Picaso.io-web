'use strict';

const path = require("path");
const express = require("express");
const app = express();

const { API_DICTIONARY_v1 } = require('./server/API');

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Picaso.io Endpoints
 */

 // HOME Site
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

//  Join a created game Site
app.get('/game/:id', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Play Site
app.get('/play', function(request, response) {
  response.redirect('/');
});

// Admin Site
app.get('/admin', function(request, response) {
  response.sendFile(__dirname + '/public/admin/starter.html');
});

/*
 * API Endpoints
 */
app.use('/api/dictionary', API_DICTIONARY_v1);

// 404 - NOT FOUND
app.get('*', function(request, response) {
  response.sendStatus("404");
});

module.exports = app;