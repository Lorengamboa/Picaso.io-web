'use strict';

/**
 * Generates a random string 7 characters long
 */
function createRandomString () {
   return Math.random().toString(36).substring(7);
}

/**
 * Picks a random value from all possible value that forms the passed 
 * array
 * @param {Array} arr 
 */
function rndValueArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { createRandomString, rndValueArray };