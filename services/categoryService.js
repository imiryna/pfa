const { runQuery } = require("../db");

exports.getCategories = async () => {
  return await runQuery(`SELECT * FROM category`);
};

exports.getOneCategory = async (id) => {
  return await runQuery(`SELECT * FROM category WHERE id = $1`, [id]);
};

exports.createCategory = async ({ user_id, name, category_type }) => {
  const query = "INSERT INTO account (user_id, name, category_type) VALUES ($1, $2, $3, ) RETURNING *";
  const params = [user_id, name, category_type];
  return await runQuery(query, params);
};

exports.updateCategoryInDb = async (id, ...rest) => {
  const [user_id, name, category_type] = rest;
  const query = "UPDATE account SET user_id = $1, name = $2, category_type = $3 WHERE id = $4 RETURNING *";
  const params = [user_id, name, category_type, id];
  return await runQuery(query, params);
};

exports.deleteCategoryById = async (id) => {
  return await runQuery(`DELETE FROM account WHERE id = $1 RETURNING *`, [id]);
};
