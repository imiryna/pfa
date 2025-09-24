const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Personal Finance Advisor API",
    version: "0.0.1",
    description: "API documentation using Swagger",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./swagger.json"], // path to files with JSDoc comments
};

module.exports = swaggerJSDoc(options);
