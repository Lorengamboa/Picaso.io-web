'use strict';

const express = require("express");
const S3 = require("../services/AWS-service");
const router = express.Router();

const s3Bucket = new S3("picasso.io-dev");

/**
 * @endpoint: /rndword
 * @type: GET
 * @desc: returns a random word from the dictionary
 */
router.get("/list", function(req, res) {
  try {
    s3Bucket.retrieve((err, data) => {
      if (err) throw err;
      res.json(data.Contents);
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
