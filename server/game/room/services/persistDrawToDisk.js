'use strict';

const fs = require('fs');
var S3 = require('aws-sdk/clients/s3');
const uuidv1 = require('uuid/v1');

var s3Bucket = new S3( { params: {Bucket: 'picasso.io-dev'} } );

/**
 * 
 * @param {*} base64 
 */
const persistDrawToDisk = (base64) => {
    var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const uuid = uuidv1(); // time-based

    //save to disk file
    // fs.writeFile(pathName, base64Data, 'base64', function (err) {
    //     if (err) return console.log("Error", err);
    // });
    
    const buf = new Buffer(base64Data,'base64')
    var data = {
      Key: uuid, 
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };

    s3Bucket.putObject(data, function(err, data){

        if (err) {
            console.log(err)
        } else {
            console.log("Successfully uploaded data to myBucket/myKey");
        }
    });

}

module.exports = persistDrawToDisk;
