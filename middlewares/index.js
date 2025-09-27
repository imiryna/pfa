const { authentificate } = require("./authMiddleware");
const authValidation = require("./validateAuth");
const userValidation = require("./validateUser");
const accountValidation = require("./validateAccount");
const { checkAddUser, checkUpdateUser } = require("./userMiddleware");
const { checkAddAccount, checkUpdateAccount } = require("./accountMiddleware");

module.exports = {
  authentificate,
  authValidation,
  userValidation,
  accountValidation,
  checkAddUser,
  checkUpdateUser,
  checkAddAccount,
  checkUpdateAccount,
};
