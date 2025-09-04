const { Client } = require("pg");
const client = new Client({
  database: "fin_adviser",
});
// {
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     database: process.env.PGDATABASE,
//   }
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
