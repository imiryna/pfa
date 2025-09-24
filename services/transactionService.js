const { runQuery } = require("../db");

exports.getTransaction = async () => {
  return await runQuery(`SELECT * FROM transaction`);
};

exports.getOneTransaction = async (id) => {
  return await runQuery(`SELECT * FROM transaction WHERE id = $1`, [id]);
};

exports.createTransaction = async ({ account_id, category_id, amount, tags }) => {
  const query = "INSERT INTO transaction ( account_id, category_id, amount, tags) VALUES ($1, $2, $3, $4 ) RETURNING *";
  const params = [account_id, category_id, amount, tags];
  return await runQuery(query, params);
};
