"use strict";

const fs = require("fs");
const path = require("path");
var express = require("express");

var router = express.Router();

const { rndValueArray } = require("../utils");

const PATH_FILE = path.join(__dirname, "/../assets/words.json");

/**
 * @endpoint: /rndword
 * @type: GET
 * @desc: returns a random word from the dictionary
 */
router.get("/rndword", function(req, res) {
  var contents = JSON.parse(fs.readFileSync(PATH_FILE));
  const randomWord = rndValueArray(contents[0].nouns);

  res.send(randomWord);
});

/**
 * @endpoint: /word
 * @type: POST
 * @desc: returns a random word from the dictionary
 */
router.post("/word", function(req, res) {
  try {
    var new_word = req.body.keyword;
    console.log(new_word);
    if(!new_word) throw "Invalid keyword";
    
    let data = JSON.parse(fs.readFileSync(PATH_FILE));
    data[0].nouns.push(new_word);
    fs.writeFileSync(PATH_FILE, JSON.stringify(data));
    res.send("Suceed");
  } catch (error) {
    res.send(400);
  }
});

module.exports = router;
