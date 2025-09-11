const { readFileSync } = require("fs");
const { Client } = require("pg");

require("dotenv").config();

// Read the SQL file
const sql = readFileSync("schema.sql", "utf8");

const client = new Client();

async function runQuery() {
  try {
    await client.connect();
    const result = await client.query(sql);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = runQuery;
