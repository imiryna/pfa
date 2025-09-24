const { runQuery } = require("../db");

exports.getBudget = async () => {
  return await runQuery(`SELECT * FROM budget`);
};

exports.getOneBudget = async (id) => {
  return await runQuery(`SELECT * FROM budget WHERE id = $1`, [id]);
};

exports.createBudget = async ({ user_id, category_id, amount, period, end_date }) => {
  const query = "INSERT INTO budget (user_id, category_id, amount, period, end_date ) VALUES ($1, $2, $3, $4, $5 ) RETURNING *";
  const params = [user_id, category_id, amount, period, end_date];
  return await runQuery(query, params);
};

exports.updateBudgetInDb = async (id, ...rest) => {
  const [user_id, category_id, amount, period, end_date] = rest;
  const query = "UPDATE budget SET user_id = $1, category_id = $2, amount = $3, period = $4, end_date = $5 WHERE id = $6 RETURNING *";
  const params = [user_id, category_id, amount, period, end_date, id];
  return await runQuery(query, params);
};

exports.deleteBudgetById = async (id) => {
  return await runQuery(`DELETE FROM budget WHERE id = $1 RETURNING *`, [id]);
};
