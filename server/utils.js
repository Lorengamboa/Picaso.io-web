'use strict';

/**
 * Generates a random string 7 characters long
 */
function createRandomString() {
    return Math.random().toString(36).substring(7);
}

/**
 * Picks a random value from all possible value that forms the passed 
 * array
 * @param {Array} arr 
 */
function rndValueArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random hex color
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * 
 * @param {*} msg 
 */
function validateMessage(msg) {

}

/**
 * 
 * @param {*} nickname 
 */
function valiteNickname(nickname) {
    if (nickname === "" || nickname.length > 8) return false;
    return true;
}

module.exports = { createRandomString, rndValueArray, getRandomColor, valiteNickname };