const categoryValidation = require("./schemas/validateCategory");

exports.checkAddCategory = (req, res, next) => {
  const { error } = categoryValidation.addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.checkUpdateCategory = (req, res, next) => {
  const { error } = categoryValidation.updateCategorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
