'use strict';

const { rndValueArray } = require('../../../utils')
const general_dictionary = require('../../../dictionary/general_en')

/**
 * 
 */
const requestRandomWord = function () {
    const randomWord = rndValueArray(general_dictionary.nouns);
    return randomWord;
}

module.exports = requestRandomWord;
