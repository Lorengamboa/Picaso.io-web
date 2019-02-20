'use strict'

const fs = require('fs');

/**
 * 
 * @param {*} file 
 */
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

/**
 * Generates a random string 7 characters long
 */
function createRandomString() {
  return Math.random()
    .toString(36)
    .substring(7)
}

/**
 * Picks a random value from all possible value that forms the passed
 * array
 * @param {Array} arr
 */
function rndValueArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Generates a random hex color
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * 
 * @param {s} msg 
 */
function isBlank(msg) {
  if(!msg || /^\s*$/.test(msg)) return true;

  return false;
}


/**
 *
 * @param {*} nickname
 */
function valiteNickname(nickname) {
  if (nickname === '' || nickname.length > 20) return false;
  return true;
}

module.exports = {
  createRandomString,
  rndValueArray,
  getRandomColor,
  valiteNickname,
  isBlank,
  base64_encode,
}
