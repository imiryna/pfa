const { getAllUsers, createUser, updateUser, deleteUser } = require("./userController");
const { getAllAccounts, getAccountById, createNewAccount, updateAccount, deleteAccount } = require("./accountController");
const { getAllCategories, getCategoryById, createNewCategory, updateCategory, deleteCategory } = require("./categoryController");

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
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
