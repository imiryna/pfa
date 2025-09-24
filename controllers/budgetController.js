const HttpError = require("../helpers/httpError");

const { getOneUser, getBudget, getOneCategory, getOneBudget, createBudget, deleteBudgetById } = require("../services");

exports.getAllBudgets = async (req, res, next) => {
  try {
    const result = await getBudget();

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBudgetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneBudget(id);

    if (!result) {
      return HttpError(404, "Account not found");
    }

    return res.status(200).json(results.rows);
  } catch (er) {
    next(er);
  }
};

exports.createNewBudget = async (req, res, next) => {
  try {
    const budgetData = req.body;

    const isUser = await getOneUser(budgetData.user_id);

    if (isUser.rowCount < 1) {
      return HttpError(404, "User not found");
    }

    const isCategory = await getOneCategory(budgetData.category_id);
    if (isCategory.rowCount < 1) {
      return HttpError(404, "Category not found");
    }

    const result = await createBudget({
      user_id: budgetData.user_id,
      category_id: budgetData.account_id,
      amount: budgetData.amount,
      period: budgetData.period,
      end_date: budgetData.end_date,
    });
    const newBudget = result.rows.pop();

    res.status(201).json({
      msg: "Success",
      budget: newBudget,
    });
  } catch (error) {
    next(error);
  }
};

// update

exports.updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, category_id, amount, period, end_date } = req.body;

    // check if account exists
    const budget = await getOneBudget(id);
    if (!budget) {
      return HttpError(404, "Budget not found");
    }

    // check if user exists
    const isUser = req.body.user_id;
    if (isUser.rowCount < 1) {
      return HttpError(404, "User not found");
    }

    const isCategory = req.body.category_id;
    if (isCategory.rowCount < 1) {
      return HttpError(404, "Category not found");
    }

    deleteBudgetById(id, user_id, category_id, amount, period, end_date);

    res.status(200).send(`Budget modified with ID: ${id}`);
  } catch (er) {
    next(er);
  }
};

// delete
exports.deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getOneBudget(id);

    if (!result) {
      return HttpError(404, "Budget not found");
    }

    deleteBudgetById(id);

    res.status(200).send(`Account deleted with ID: ${id}`);
  } catch (error) {
    next(error);
  }
};
