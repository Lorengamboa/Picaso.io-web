'use strict';

const path = require("path");
const express = require("express");
const app = express();

const API = require('./server/API/router');

//
app.use(express.static(path.join(__dirname, 'public')));

//
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

//
app.get('/play', function(request, response) {
  response.redirect('/');
});

//
app.use('/api', API);


module.exports = app;