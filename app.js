const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Наше проміжне ПЗ");
  next();
});

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

app.get("/", (req, res) => {
  console.log(req.query);
});

module.exports = app; // export instance app
