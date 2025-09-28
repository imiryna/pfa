const budgetValidation = require("./schemas/validateBudget");

exports.checkAddbudget = (req, res, next) => {
  const { error } = budgetValidation.addBudgetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.checkUpdatebudget = (req, res, next) => {
  const { error } = budgetValidation.updateBudgetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
