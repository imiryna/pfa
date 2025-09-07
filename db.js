const { Client } = require("pg");

require("dotenv").config();

const client = new Client();

async function runQuery() {
  try {
    await client.connect();
    const result = await client.query("SELECT NOW()");
    console.log(result);
  } catch (error) {
    console.error(err);
  } finally {
    await client.end();
  }
}

module.exports = runQuery;
