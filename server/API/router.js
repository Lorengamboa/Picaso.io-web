'use strict'; 

var express = require('express');
var router = express.Router();

const general_dictionary = require('../dictionary/general_en');
const { rndValueArray } = require('../utils');

// define the home page route
router.get('/rndword', function(req, res) {
    const randomWord = rndValueArray(general_dictionary.nouns);
  
    res.json(randomWord);
});

module.exports = router;
