const HttpError = require("../helpers/httpError");

const { getTransactions, getOneTransaction, getOneAccount, getOneCategory, createTransaction, updateAccountBalance } = require("../services");

exports.getAllTransaction = async (req, res, next) => {
  try {
    const result = await getTransactions();

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneTransaction(id);

    if (!result) {
      return HttpError(404, "Category not found");
    }

    return res.status(200).json(results.rows);
  } catch (er) {
    next(er);
  }
};

exports.createNewTransaction = async (req, res, next) => {
  try {
    const transactionData = req.body;

    const account = await getOneAccount(transactionData.account_id);

    if (account.rowCount < 1) {
      return HttpError(404, "Account not found");
    }

    const categoryId = await getOneCategory(transactionData.category_id);

    if (categoryId.rowCount < 1) {
      return HttpError(404, "Category not found");
    }

    const result = await createTransaction({
      account_id: transactionData.account_id,
      category_id: transactionData.category_id,
      amount: transactionData.amount,
      tags: transactionData.tags,
    });

    const newTransaction = result.rows.pop();

    const newBalance = Number(account.rows[0].balance) + Number(transactionData.amount);

    updateAccountBalance(transactionData.account_id, newBalance);

    res.status(201).json({
      msg: "Success",
      transaction: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};
