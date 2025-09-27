const userValidation = require("./validateUser");

exports.checkAddUser = async (req, res, next) => {
  if (req.method === "POST") {
    const validateResult = userValidation.addSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error });
    }
    next();
  }
};

exports.checkUpdateUser = async (req, res, next) => {
  const validateResult = userValidation.updateSchema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({ message: validateResult.error });
  }
  next();
};
