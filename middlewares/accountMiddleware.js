const accountValidation = require("./schemas/validateAccount");

exports.checkAddAccount = (req, res, next) => {
  const { error } = accountValidation.addAccountSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.checkUpdateAccount = (req, res, next) => {
  const { error } = accountValidation.updateAccountSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
