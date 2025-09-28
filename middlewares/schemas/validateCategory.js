const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().max(60).required().messages({
    "any.required": "Category name is required",
    "string.max": "Category name must be at most 60 characters",
  }),

  category_type: Joi.string().valid("income", "expenses", "transfer").required().messages({
    "any.required": "Category type is required",
    "any.only": "Category type must be one of income, expenses, or transfer",
  }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().max(60),
  category_type: Joi.string().valid("income", "expenses", "transfer"),
});

const categoryValidation = {
  addSchema,
  updateCategorySchema,
};

module.exports = categoryValidation;
