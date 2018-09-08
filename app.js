'use strict';

const path = require("path");
const express = require("express");
const app = express();

const { API_DICTIONARY_v1, API_DRAW_SAMPLES } = require('./server/API');

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

/**********************************************************************/
/*                    PICASO.IO API                                   */
/**********************************************************************/

app.use('/api/dictionary', API_DICTIONARY_v1);

app.use('/api/sample', API_DRAW_SAMPLES);

/**********************************************************************/
/*                  PICASO.IO ENDPOINTS                               */
/**********************************************************************/

// Admin Site
app.get('/admin', function (request, response) {
  response.sendFile(__dirname + '/public/admin/starter.html');
});

// HOME Site
app.get('*', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});


module.exports = app;