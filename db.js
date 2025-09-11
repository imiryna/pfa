const { readFileSync } = require("fs");
const { Client } = require("pg");

require("dotenv").config();

// Read the SQL file
const sql = readFileSync("schema.sql", "utf8");

const client = new Client();

async function runQuery() {
  try {
    await client.connect();
    await client.query(sql);
    console.log("Schema executed successfully");
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

runQuery();

module.exports = runQuery;
