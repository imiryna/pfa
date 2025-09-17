const { readFileSync } = require("fs");
const { Client } = require("pg");

require("dotenv").config();

// Read the SQL file
const initSql = readFileSync("schema.sql", "utf8");

const client = new Client();

exports.runQuery = async (sql) => {
  try {
    await client.connect();
    const response = await client.query(sql);
    return response;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
};

//runQuery();

// module.exports = runQuery;
