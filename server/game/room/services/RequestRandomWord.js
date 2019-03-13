"use strict";

var path = require("path");
var fs = require("fs");

const { rndValueArray } = require("../../../utils");

const PATH_FILE = "/../../../assets/words.json";

/**
 * Request a random word from the nouns list
 */
const requestRandomWord = function() {
  try {
    var contents = JSON.parse(fs.readFileSync(path.join(__dirname, PATH_FILE)));
    const randomWord = rndValueArray(contents[0].nouns);
    return randomWord;
  } catch (error) {
    return "couldnt find a word...";
  }
};

module.exports = requestRandomWord;
