const Joi = require("joi");

const addAccountSchema = Joi.object({
  user_id: Joi.string().uuid().required().messages({
    "any.required": "User ID is required",
    "string.guid": "User ID must be a valid UUID",
  }),

  account_type: Joi.string().valid("bank", "cc", "investment", "cash", "crypto").required().messages({
    "any.required": "Account type is required",
    "any.only": "Account type must be one of bank, cc, investment, cash, crypto",
  }),

  institution_name: Joi.string().min(2).max(100).required().messages({
    "any.required": "Institution name is required",
  }),

  alias: Joi.string().max(60).optional(),

  currency: Joi.string().length(3).uppercase().required().messages({
    "any.required": "Currency code is required",
    "string.length": "Currency must be a 3-letter ISO code",
  }),

  balance: Joi.number().precision(2).required().messages({
    "any.required": "Balance is required",
    "number.base": "Balance must be a number",
  }),
});

const updateAccountSchema = Joi.object({
  account_type: Joi.string().valid("bank", "cc", "investment", "cash", "crypto").optional().messages({
    "any.only": "Account type must be one of bank, cc, investment, cash, crypto",
  }),

  institution_name: Joi.string().min(2).max(100).optional(),

  alias: Joi.string().max(60).optional(),

  currency: Joi.string().length(3).uppercase().optional().messages({
    "string.length": "Currency must be a 3-letter ISO code",
  }),

  balance: Joi.number().precision(2).optional().messages({
    "number.base": "Balance must be a number",
  }),
});

const accountValidation = {
  addAccountSchema,
  updateAccountSchema,
};

module.exports = accountValidation;
