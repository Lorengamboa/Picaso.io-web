var S3 = require("aws-sdk/clients/s3");
const logger = require("../../logger");

var params = {
};

class AWSManager {
  constructor(bucketName) {
    this.bucket = new S3({ params: { Bucket: bucketName } });
  }

  /**
   *
   */
  retrieve(cb) {
    this.bucket.listObjects(params, function(err, data) {
      if (err) {
        return cb("There was an error viewing your album: " + err.message);
      } else {
        return cb(null, data);
      }
    });
  }

  /**
   *
   */
  upload(object) {
    this.bucket.putObject(object, function(err, data) {
      if (err) {
        logger.server.error(err);
      } else {
        logger.server.info("Successfully uploaded data to myBucket/myKey");
      }
    });
  }
}

module.exports = AWSManager;
