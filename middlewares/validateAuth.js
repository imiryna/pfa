const Joi = require("joi");

const registSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const authValidation = {
  registSchema,
};

module.exports = authValidation;
