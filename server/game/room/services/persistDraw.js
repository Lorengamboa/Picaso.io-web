"use strict";

const uuidv1 = require("uuid/v1");
const S3 = require("../../../services/AWS-service");

const s3Bucket = new S3("picasso.io-dev");

/**
 *
 * @param {*} base64
 */
const persistDraw = base64 => {
  return new Promise(function(resolve, reject) {
    try {
      let base64Data = base64.replace(/^data:image\/png;base64,/, "");
      const uuid = uuidv1();

      const buf = new Buffer(base64Data, "base64");
      let object = {
        Key: uuid,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "image/jpeg"
      };
      s3Bucket.upload(object); // upload object data to s3 bucket!
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = persistDraw;
