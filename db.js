const { readFileSync } = require("fs");
const { Pool } = require("pg");

require("dotenv").config();

// Read the SQL file
const initSql = readFileSync("schema.sql", "utf8");

const client = new Pool();

exports.runQuery = async (sql, params = []) => {
  try {
    const response = await client.query(sql, params);
    return response;
  } catch (error) {
    throw error;
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
