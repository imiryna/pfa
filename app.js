const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { signToken, verifyRefresh } = require("./services/jwtService");
const HttpError = require("./helpers/httpError");
const { getUsers, createUser } = require("./services");

require("dotenv").config();

// const authRouter = require("./routes/authRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const accountRouter = require("./routes/accountRoute");
const categoryRouter = require("./routes/categoryRoute");
const transactionRouret = require("./routes/transactionRoute");
const calcRoute = require("./routes/calculateRoute");

// Swagger implemetation
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");

// function for healthcheck DB
const { healthCheck } = require("./db");

const app = express();

// dotenv.config({
//   path: "./.env",
// });

// MIDDLEWARE ========
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// API routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/category", categoryRouter);
app.use("/api/transaction", transactionRouret);
app.use("/api/calc", calcRoute);

app.get("/health", async (req, res) => {
  const dbHealth = await healthCheck();
  return res.status(200).json({ app: true, db: dbHealth });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.stack });
});

// POST_AUTH =========

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

module.exports = app; // export instance app
