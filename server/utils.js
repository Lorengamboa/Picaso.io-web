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

function color_to_rgba(color) {
  if (color[0] == "#") {
    // hex notation
    color = color.replace("#", "");
    var bigint = parseInt(color, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return {
      r: r,
      g: g,
      b: b,
      a: 255
    };
  } else if (color.indexOf("rgba(") == 0) {
    // already in rgba notation
    color = color
      .replace("rgba(", "")
      .replace(" ", "")
      .replace(")", "")
      .split(",");
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3] * 255
    };
  } else {
    console.error("warning: can't convert color to rgba: " + color);
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
  }
}

module.exports = {
  createRandomString,
  rndValueArray,
  getRandomColor,
  valiteNickname,
  isBlank,
  base64_encode,
  color_to_rgba
}
