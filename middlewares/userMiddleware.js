const userValidation = require("./schemas/validateUser");

exports.checkAddUser = async (req, res, next) => {
  if (req.method === "POST") {
    const { error } = userValidation.addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }
};

exports.checkUpdateUser = async (req, res, next) => {
  const { error } = userValidation.updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
