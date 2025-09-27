const accountValidation = require("./validateAccount");

exports.checkAddAccount = async (req, res, next) => {
  if (req.method === "POST") {
    const validateResult = accountValidation.addAccountSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error });
    }
    next();
  }
};

exports.checkUpdateAccount = async (req, res, next) => {
  const validateResult = accountValidation.updateAccountSchema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({ message: validateResult.error });
  }
  next();
};
