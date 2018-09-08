'use strict';

const fs = require('fs');
const uuidv1 = require('uuid/v1');

/**
 * 
 * @param {*} base64 
 */
const persistDrawToDisk = (base64) => {
    var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const uuid = uuidv1(); // time-based
    const pathName = `${__dirname}/../../draws/test_${uuid}.jpg`;

    //save to disk file
    fs.writeFile(pathName, base64Data, 'base64', function (err) {
        if (err) return console.log("Error", err);
    });
}

module.exports = persistDrawToDisk;
