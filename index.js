const express = require("express");
const dotEnv = require("dotenv");
const config = require("./config/developmentConfig")
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const dbConnection = require("./database/connection");
dotEnv.config();
const app = express();

dbConnection();

//cors
app.use(cors());

//Request payload middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/employee", require("./routes/employeeRoute"));

//
if (config.NODE_ENV != "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.get("/", (req, res, next) => {

  res.send("Hello from Node API Server");
});
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
