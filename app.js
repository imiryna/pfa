const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

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

module.exports = app; // export instance app
