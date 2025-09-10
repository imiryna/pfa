const { Client } = require("pg");

require("dotenv").config();

const client = new Client();

async function runQuery(queryString) {
  try {
    await client.connect();
    const result = await client.query(queryString);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = runQuery;
