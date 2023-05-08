//This file handles the Router-level middleware

const express = require("express");

const router = express.Router();
const employeeController = require("../controllers/employeeController");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation"); // have added this middleware for productRoutes.js
const employeeSchema = require("../apiSchema/employeeSchema"); //I already have the product schema over here which we have imported from apischema --> product
//const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  employeeController.createEmployee
);

router.get("/:id", employeeController.getEmployeeById);

router.put(
  "/:id",
  employeeController.updateEmployee
);


router.get(
  "/",
  employeeController.getAllEmployee
);

router.delete(
  "/:id",
  employeeController.deleteEmployee
);

module.exports = router;
