const transactionValidation = require("./schemas/validateTransaction");

exports.checkAddtransaction = (req, res, next) => {
  const { error } = transactionValidation.addTransactionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
