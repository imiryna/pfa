const { runQuery } = require("../db");

exports.getUsers = async () => {
  return await runQuery(`SELECT * FROM users`);
};

exports.getOneUser = async (id) => {
  return await runQuery("SELECT * FROM users WHERE id = $1", [id]);
};

exports.getUserByEmail = async (email) => {
  return await runQuery("SELECT * FROM users WHERE users.email = $1", [email]);
};

exports.createUser = async ({ name, email, password }) => {
  const query = "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *";
  const params = [name, email, password];
  return await runQuery(query, params);
};

exports.updateUserInDb = async (id, ...rest) => {
  const [name, email] = rest;
  const query = "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
  const params = [name, email, id];
  return await runQuery(query, params);
};

exports.deleteUserById = async (id) => {
  return await runQuery("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
};
