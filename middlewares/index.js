const { authentificate } = require("./authMiddleware");
const authValidation = require("./schemas/validateAuth");
const userValidation = require("./schemas/validateUser");
const accountValidation = require("./schemas/validateAccount");
const categoryValidation = require("./schemas/validateCategory");
const transactionValidate = require("./schemas/validateTransaction");
const { checkAddUser, checkUpdateUser } = require("./userMiddleware");
const { checkAddAccount, checkUpdateAccount } = require("./accountMiddleware");
const { checkAddCategory, checkUpdateCategory } = require("./categoryMiddleware");

module.exports = {
  authentificate,
  authValidation,
  userValidation,
  accountValidation,
  categoryValidation,
  transactionValidate,
  checkAddUser,
  checkUpdateUser,
  checkAddAccount,
  checkUpdateAccount,
  checkAddCategory,
  checkUpdateCategory,
};
