const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Personal Finance Advisor API",
    version: "1.0.0",
    description: "API documentation using Swagger",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
