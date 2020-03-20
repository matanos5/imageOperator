const Joi = require('@hapi/joi');
const config = require('../config/project.config');

const resizeSchema = Joi.object({
  width: Joi.number()
      .min(config.MIN_IMAGE_SIZE)
      .max(config.MAX_IMAGE_SIZE)
      .optional(),
  height: Joi.number()
      .min(config.MIN_IMAGE_SIZE)
      .max(config.MAX_IMAGE_SIZE)
      .optional(),
});
module.exports = resizeSchema;
