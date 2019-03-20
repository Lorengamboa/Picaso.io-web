const Joi = require("joi");
const { DRAW_COLORS } = require("../../config/constants");

/**
 * Draw schema
 * @type String
 * @min 2 characters
 * @max 60 characters
 */
const drawSchema = Joi.object().keys({
  coordinates: Joi.object().keys({
    prevX: Joi.number().required(),
    prevY: Joi.number().required(),
    currentX: Joi.number().required(),
    currentY: Joi.number().required()
  }),
  colorPicked: Joi.string().valid(DRAW_COLORS),
  toolPicked: Joi.string(),
  penWidth: Joi.string()
});

module.exports = drawSchema;
