const { runQuery } = require("../db");

exports.getUsers = async () => {
  return await runQuery(`SELECT * FROM users`);
};

exports.createUser = async ({ name, email, password }) => {
  return await runQuery("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
};
