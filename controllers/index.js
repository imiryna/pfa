const { getAllUsers, createUser, updateUser, deleteUser } = require("./userController");
const { getAllAccounts, getAccountById, createNewAccount, updateAccount, deleteAccount } = require("./accountController");
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllAccounts,
  getAccountById,
  createNewAccount,
  updateAccount,
  deleteAccount,
};
