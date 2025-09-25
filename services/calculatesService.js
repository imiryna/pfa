const { runQuery } = require("../db");

const getTotalIncome = async (userId) => {
  const { start, end } = getMonthBounds(new Date());
  return await runQuery(
    `SELECT COALESCE(SUM(t.amount),0) as total_income
     FROM transaction t
     JOIN category c ON t.category_id = c.id
     JOIN account a ON t.account_id = a.id
     WHERE c.category_type = 'income'
       AND a.user_id = $1
       AND t.create_at BETWEEN $2 AND $3`,
    [userId, start, end]
  );
};

const getTotalExpenses = async (userId) => {
  const { start, end } = getMonthBounds(new Date());
  return await runQuery(
    `SELECT COALESCE(SUM(t.amount),0) as total_expenses
       FROM transaction t
       JOIN category c ON t.category_id = c.id
       JOIN account a ON t.account_id = a.id
       WHERE c.category_type = 'expenses'
         AND a.user_id = $1
         AND t.create_at BETWEEN $2 AND $3`,
    [userId, start, end]
  );
};

const getMonthBounds = (some_date) => {
  // first day of month, at midnight
  const start = new Date(some_date.getFullYear(), some_date.getMonth(), 1, 0, 0, 0, 0);

  // last day of month, at 23:59:59.999
  const end = new Date(some_date.getFullYear(), some_date.getMonth() + 1, 0, 23, 59, 59, 999);

  return { start, end };
};

exports.disposalIncome = async (userId) => {
  const resTotalIncome = await getTotalIncome(userId);
  const resTotalExpenses = await getTotalExpenses(userId);
  const disposalIncome = (Number(resTotalIncome.rows[0].total_income) + Number(resTotalExpenses.rows[0].total_expenses)).toFixed(2);
  return disposalIncome;
};

exports.savingRate = async (userId) => {
  const resTotalIncome = await getTotalIncome(userId);
  const netDisposableIncome = await this.disposalIncome(userId);
  const savingRate = (Number(netDisposableIncome) / Number(resTotalIncome.rows[0].total_income)) * 100;
  return savingRate;
};

exports.calcMaximumLoan = async (userId) => {
  const netDisposableIncome = await this.disposalIncome(userId);
  const maxInstalment = Number(netDisposableIncome) * 0.4;
  const loanInterest = 0.07; // 7% annual
  const loanPeriod = 25; // 25 years
  const monthInterest = loanInterest / 12;
  const instalmentAmount = loanPeriod * 12;

  const result = (maxInstalment * (1 - Math.pow(1 + monthInterest, -instalmentAmount))) / monthInterest;
  return result.toFixed(2);
};
