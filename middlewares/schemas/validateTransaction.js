const Joi = require("joi");

const addTransactionSchema = Joi.object({
  account_id: Joi.string().uuid().required().messages({
    "any.required": "Account ID is required",
    "string.guid": "Account ID must be a valid UUID",
  }),
  category_id: Joi.string().uuid().allow(null).optional().messages({
    "string.guid": "Category ID must be a valid UUID",
  }),
  amount: Joi.number().precision(2).required().messages({
    "any.required": "Amount is required",
    "number.base": "Amount must be a number",
  }),
  create_at: Joi.date().iso().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const transactionValidate = {
  addTransactionSchema,
};

module.exports = transactionValidate;
