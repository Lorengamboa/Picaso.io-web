"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const { rndValueArray } = require("../utils");

const PATH_FILE = path.join(__dirname, "/../assets/words.json");

/**
 * @endpoint: /rndword
 * @type: GET
 * @desc: returns a random word from the dictionary
 */
router.get("/rndword", function(req, res) {
  try {
    var contents = JSON.parse(fs.readFileSync(PATH_FILE));
    const randomWord = rndValueArray(contents[0].nouns);
  
    res.send(randomWord);
  } catch (error) {
    res.send("Word not found");
  }

});

/**
 * @endpoint: /word
 * @type: POST
 * @desc: returns a random word from the dictionary
 */
router.post("/word", function(req, res) {
  try {
    var new_word = req.body.keyword;
    if (!new_word) throw "Invalid keyword";

    let data = JSON.parse(fs.readFileSync(PATH_FILE));
    data[0].nouns.push(new_word);
    fs.writeFileSync(PATH_FILE, JSON.stringify(data));
    res.send("Suceed");
  } catch (error) {
    res.send(400);
  }
});

/**
 * @endpoint: /fword
 * @type: POST
 * @desc: returns a bool value of wether or not the word is included
 */
router.post("/fword", function(req, res) {
  try {
    var keyword = req.body.keyword;
    if (!query) throw "Invalid keyword";

    let data = JSON.parse(fs.readFileSync(PATH_FILE));
    const isIndexed = data[0].nouns.includes(keyword);

    res.send(isIndexed);
  } catch (error) {
    res.send(400);
  }
});

/**
 * @endpoint: /wcount
 * @type: GET
 * @desc: returns the number of words available
 */
router.get("/wcount", function(req, res) {
  try {
    let data = JSON.parse(fs.readFileSync(PATH_FILE));
    const total = data[0].nouns.length;

    res.send(total);
  } catch (error) {
    res.send(400);
  }
});

module.exports = router;
