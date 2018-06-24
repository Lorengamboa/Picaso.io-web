'use strict'; 

var express = require('express');
var router = express.Router();

const general_dictionary = require('../dictionary/general_en');
const { rndValueArray } = require('../utils');

/**
 * API ROUTES
 * game API routes related to game dicitonary
 */

/**
 * @endpoint: /rnword
 * @type: GET
 * @desc: returns a random word from the dictionary
 */
router.get('/rndword', function(req, res) {
    const randomWord = rndValueArray(general_dictionary.nouns);
  
    res.json(randomWord);
});

module.exports = router;
