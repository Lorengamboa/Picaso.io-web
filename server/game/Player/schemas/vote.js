const Joi = require('joi');

/**
 * Message schema
 * @type String
 * @min 2 characters 
 * @max 60 characters
 */
const voteSchema = Joi.string().min(2).max(60)

module.exports = voteSchema;