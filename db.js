const { Pool } = require("pg");

require("dotenv").config();

const client = new Pool();

exports.runQuery = async (sql, params = []) => {
  try {
    const response = await client.query(sql, params);
    return response;
  } catch (error) {
    console.log(error);
  }
};

exports.healthCheck = async () => {
  try {
    await client.query("SELECT 1");
    return { status: "ok" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

// module.exports = runQuery;
