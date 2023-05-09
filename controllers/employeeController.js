

const employeeService = require("../services/employeeService");

const constants = require("../constants");
const {createEmployeeSchema,updateEmployeeSchema} = require("../apiSchema/employeeSchema")
module.exports.createEmployee = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const { isValid, error } = createEmployeeSchema(req.body);
    if (isValid) {
    const responseFromService = await employeeService.createEmployee(req.body);
    response.status = 200;

    response.message = constants.employeeMessage.EMPLOYEE_CREATED; 
    response.body = responseFromService;
    }
    else  {
      res.send(...error,constants.requestValidateMessage.BAD_REQUEST)
    }
  } catch (error) {
    console.log("Something went wrong: Controller: createEmployee", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};

//This below syntax for get() method
module.exports.getAllEmployee = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await employeeService.getAllEmployees(req.query); 

    response.status = 200;

    response.message = constants.employeeMessage.EMPLOYEE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllEmployee", error);

    response.message = error.message;
  }
  return res.status(response.status).send(response);
};


module.exports.getEmployeeById = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await employeeService.getEmployeeById(req.params); //So your path params are basically presents inside of the req.params

    response.status = 200;

    response.message = constants.employeeMessage.EMPLOYEE_FETCHED;
    response.body = responseFromService;
    
  } catch (error) {
    console.log("Something went wrong: Controller: getEmployeeById", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};

// This controller for updating the Employee by their ID
module.exports.updateEmployee = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const { isValid, error } = updateEmployeeSchema(req.body);
    if (isValid) {
    const responseFromService = await employeeService.updateEmployeeDetails({
      id: req.params.id,
      updateInfo: req.body, 
    }); 

    response.status = 200;

    response.message = constants.employeeMessage.EMPLOYEE_UPDATED;
    response.body = responseFromService;
  }
  else  {
    res.send(...error,constants.requestValidateMessage.BAD_REQUEST)
  }
  } catch (error) {
    console.log("Something went wrong: Controller: updateEmployeeDetails", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};


module.exports.deleteEmployee = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await employeeService.deleteEmployee(req.params);
    response.status = 200;

    response.message = constants.employeeMessage.EMPLOYEE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteEmployee", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};
