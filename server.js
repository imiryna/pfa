const app = require("./app");

// SERVER INIT ================
const port = 3001;

module.exports = app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
