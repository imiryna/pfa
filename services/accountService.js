const { runQuery } = require("../db");

exports.getAccounts = async () => {
  return await runQuery(`SELECT * FROM account`);
};

exports.getOneAccount = async (id) => {
  return await runQuery(`SELECT * FROM account WHERE id = $1`, [id]);
};

exports.createAccount = async ({ user_id, accountType, institutionName, alias, currency, balance }) => {
  const query = "INSERT INTO account (user_id, account_type, institution_name, alias, currency, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const params = [user_id, accountType, institutionName, alias, currency, balance];
  return await runQuery(query, params);
};

exports.updateAccountInDb = async (id, ...rest) => {
  const [user_id, account_type, institution_name, alias, currency, balance] = rest;
  const query = "UPDATE account SET user_id = $1, account_type = $2, institution_name = $3, alias = $4, currency = $5, balance = $6, update_at = $7 WHERE id = $8 RETURNING *";
  const params = [user_id, account_type, institution_name, alias, currency, balance, new Date(), id];
  return await runQuery(query, params);
};

exports.deleteAccountById = async (id) => {
  return await runQuery(`DELETE FROM account WHERE id = $1 RETURNING *`, [id]);
};
