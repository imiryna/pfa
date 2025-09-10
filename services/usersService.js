const { runQuery } = require("../db");

exports.getUsers = async () => {
  const result = await runQuery(`SELECT * FROM users`);
  return result;
};
