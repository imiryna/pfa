const { runQuery } = require("../db");

exports.getAccounts = async () => {
  return await runQuery(`SELECT * FROM accounts`);
};

exports.getOneAccount = async (id) => {
  return await runQuery(`SELECT * FROM accounts WHERE id = $1`, [id]);
};

exports.createAccount = async ({ accountType, institutionName, alias, currency }) => {
  const query = "INSERT INTO accounts (account_type, institution_name, alias, currency) VALUES ($1, $2, $3, $4) RETURNING *";
  const params = [accountType, institutionName, alias, currency];
  return await runQuery(query, params);
};

exports.updateAccountInDb = async (id, ...rest) => {
  const [account_type, institution_name, alias, currency] = rest;
  const query = "UPDATE accounts SET account_type = $1, institution_name = $2, alias = $3, currency = $4, update_at = $5 WHERE id = $6 RETURNING *";
  const params = [account_type, institution_name, alias, currency, new Date(), id];
  return await runQuery(query, params);
};

exports.deleteAccountById = async (id) => {
  return await runQuery(`DELETE FROM accounts WHERE id = $1 RETURNING *`, [id]);
};
