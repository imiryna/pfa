const HttpError = require("../helpers/httpError");

const { getAccounts, getOneAccount, createAccount, updateAccountInDb, deleteAccountById } = require("../services/accountService");
const { getOneUser } = require("../services/usersService");

exports.getAllAccounts = async (req, res, next) => {
  try {
    const result = await getAccounts();

    res.status(201).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAccountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneAccount(id);

    if (!result) {
      return HttpError(404, "Account not found");
    }

    return res.status(200).json(results.rows);
  } catch (er) {
    next(er);
  }
};

exports.createNewAccount = async (req, res, next) => {
  try {
    const accountData = req.body;

    const isUser = await getOneUser(accountData.user_id);

    if (isUser.rowCount < 1) {
      return HttpError(404, "User not found");
    }

    // console.log(passwordValidate);

    const result = await createAccount({
      user_id: accountData.user_id,
      accountType: accountData.account_type,
      institutionName: accountData.institution_name,
      alias: accountData.alias,
      currency: accountData.currency,
      balance: accountData.balance,
    });
    const newAccount = result.rows.pop();

    res.status(201).json({
      msg: "Success",
      account: newAccount,
    });
  } catch (error) {
    next(error);
  }
};

// update

exports.updateAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, account_type, institution_name, alias, currency, balance } = req.body;

    // check if account exists
    const account = await getOneAccount(id);
    if (!account) {
      return HttpError(404, "Account not found");
    }

    // check if user exists
    const isUser = req.body.user_id;
    if (isUser.rowCount < 1) {
      return HttpError(404, "User not found");
    }

    updateAccountInDb(id, user_id, account_type, institution_name, alias, currency, balance);

    res.status(200).send(`Acvcount modified with ID: ${id}`);
  } catch (er) {
    next(er);
  }
};

// delete
exports.deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getOneAccount(id);

    if (!result) {
      return HttpError(404, "Account not found");
    }

    deleteAccountById(id);

    res.status(200).send(`Account deleted with ID: ${id}`);
  } catch (error) {
    next(error);
  }
};
