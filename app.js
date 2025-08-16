const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { signToken, checkToken } = require("./jwtService");
const HttpError = require("./helpers/httpError");

const app = express();

dotenv.config({
  path: "./.env",
});

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// POST_AUTH ========
app.post("/auth", (req, res) => {
  try {
    const id = req.body.id;
    const token = signToken(id);

    return res.status(201).json({ token: token });
  } catch (error) {
    return HttpError(401, "unauthorized");
  }
});
// AUTH_MIDDLEWARE ==
const authMiddleware = (req, res, next) => {
  const rawToken = req.headers.authorization;

  if (!rawToken) return res.status(401).json("unauthorized");
  const token = rawToken.split(" ")[1];

  //verify of token
  try {
    checkToken(token);
  } catch (e) {
    return res.status(e.status).json({ message: e.message });
  }
  next();
};

// CRUD =============
app.post("/users", authMiddleware, (req, res) => {
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
  res.status(200).json("hello");
});

module.exports = app; // export instance app
