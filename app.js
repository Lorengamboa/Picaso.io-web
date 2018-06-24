'use strict';

const path = require("path");
const express = require("express");
const app = express();

const API = require('./server/API/router');

// STATIC SERVE FILES
app.use(express.static(path.join(__dirname, 'public')));

/*
 * SERVER HTTP ENDPOINTS
 */

 // HOME SITE
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// API SERVICE
app.use('/api', API);

// Page not found 404, then take him to home page
app.use('*', function(request, response) {
  response.redirect('/');
});

module.exports = app;