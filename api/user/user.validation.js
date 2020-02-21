const Joi = require("joi");

exports.loginValidateSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
  .options({ abortEarly: false });
exports.registerValidateSchema = Joi.object()
  .keys({
    firstName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  })
  .options({ abortEarly: false });
