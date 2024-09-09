const Joi = require("joi");

const password = Joi.string().min(8);
const token = Joi.string().required();
const email = Joi.string().email().required();

const forgetPasswordSchema = Joi.object({
  newPassword: password.required(),
  token: token.required(),
});

const recoverySchema = Joi.object({
  email,
});

module.exports = { forgetPasswordSchema, recoverySchema };
