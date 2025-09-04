const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { signToken, checkToken, verifyRefresh } = require("./jwtService");
const HttpError = require("./helpers/httpError");
const runQuery = require("./db");

const app = express();

dotenv.config({
  path: "./.env",
});

// MIDDLEWARE ========
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// POST_AUTH =========
app.post("/auth", (req, res) => {
  try {
    const id = req.body.id;

    if (!id) return res.status(400).json({ message: "enter valid credientials" });

    const token = signToken({ id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
    const refreshToken = signToken({ id }, process.env.REFRESH_SECRET, process.env.REFRESH_EXPIRES);

    return res.status(201).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    return HttpError(401, "unauthorized");
  }
});

app.post("/auth/refresh", (req, res) => {
  const { id, refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Missing token" });

  try {
    if (verifyRefresh(id, refreshToken)) {
      const newAccessToken = signToken({ id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
      res.status(201).json({ id: id, accessToken: newAccessToken });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// AUTH_MIDDLEWARE ======
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
    runQuery();
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

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = app; // export instance app
