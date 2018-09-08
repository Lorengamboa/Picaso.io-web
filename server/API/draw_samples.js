'use strict';

const fs = require('fs');
var express = require('express');
var router = express.Router();

const general_dictionary = require('../dictionary/general_en');
const { rndValueArray, base64_encode } = require('../utils');

const DRAW_SAMPLE_FOLDER = 'draws/';

/**
 * @endpoint: /draws
 * @type: GET
 * @desc:
 */
router.get('/draws', function (req, res) {
    console.log(__dirname)
    try {
        let samples = [];
        fs.readdirSync(`${__dirname}/../../draws/`).forEach(file => {
            if(file.indexOf(".jpg") === -1) return;
            const samepleImageEncoded = base64_encode(`${__dirname}/../../draws/${file}`);
            samples.push(samepleImageEncoded);
        });

        res.send(JSON.stringify(samples));
        
    } catch (error) {
        console.log(error);
        res.send("something went wrong!");
    }
});

module.exports = router;
