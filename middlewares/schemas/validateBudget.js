const Joi = require("joi");

const addBudgetSchema = Joi.object({
  category_id: Joi.string().uuid().allow(null).optional().messages({
    "string.guid": "Category ID must be a valid UUID",
  }),
  amount: Joi.number().precision(2).required().messages({
    "any.required": "Budget amount is required",
    "number.base": "Budget amount must be a number",
  }),
  period: Joi.string().valid("daily", "weekly", "biweekly", "monthly", "annual").required().messages({
    "any.required": "Budget period is required",
    "any.only": "Period must be one of daily, weekly, biweekly, monthly, annual",
  }),
  start_date: Joi.date().iso().required().messages({
    "any.required": "Start date is required",
    "date.base": "Start date must be a valid ISO date",
  }),
  end_date: Joi.date().iso().required().messages({
    "any.required": "End date is required",
    "date.base": "End date must be a valid ISO date",
  }),
});

const updateBudgetSchema = Joi.object({
  category_id: Joi.string().uuid().allow(null).optional(),
  amount: Joi.number().precision(2).optional(),
  period: Joi.string().valid("daily", "weekly", "biweekly", "monthly", "annual").optional(),
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().optional(),
});

const budgetValidation = {
  addBudgetSchema,
  updateBudgetSchema,
};

module.exports = budgetValidation;
