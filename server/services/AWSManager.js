var S3 = require('aws-sdk/clients/s3');
const logger = require('../../logger');


class AWSManager {
    constructor(bucketName) {
        this.bucket = new S3( { params: {Bucket: bucketName} } );
    }

    upload(object) {
        this.bucket.putObject(object, function(err, data){
            if (err) {
                logger.server.error(err);
            } else {
                logger.server.info("Successfully uploaded data to myBucket/myKey");
            }
        });
    }
}

module.exports = AWSManager;