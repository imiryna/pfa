const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  try {
    const { name, email } = req.body;

    // TODO: data validation

    const user = {
      name,
      email,
    };

    // save to DB

    res.status(201).json({
      data: req.body.name,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app; // export instance app
