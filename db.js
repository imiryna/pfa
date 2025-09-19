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

//runQuery();

// module.exports = runQuery;
