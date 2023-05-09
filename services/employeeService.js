
const Employee = require("../database/models/employeeModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelpers");
const constants = require("../constants");

module.exports.createEmployee = async (serviceData) => {
  try {
    
    let newEmployee = new Employee({ ...serviceData });
   
    let result = await newEmployee.save(); 
   
    return formatMongoData(result); 
  } catch (error) {
    console.log("Something went wrong: Service: createEmployee", error);
    throw new Error(error);
  }
};


module.exports.getAllEmployees = async ({ skip = 0, limit = 10 }) => {
  try {
    let employees = await Employee.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    
    return formatMongoData(employees);
  } catch (error) {
    console.log("Something went wrong: Service: getAllEmployee", error);
    
    throw new Error(error);
  }
};


module.exports.getEmployeeById = async ({ id }) => {
  try {
    checkObjectId(id);
    let employee = await Employee.findById(id);
    if (!employee) {
      throw new Error(constants.employeeMessage.EMPLOYEE_NOT_FOUND);
    }
    
    return formatMongoData(employee);
  } catch (error) {
    console.log("Something went wrong: Service: getEmployeeById ", error);
  
    throw new Error(error);
  }
};


module.exports.updateEmployeeDetails = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let updateEmployee = await Employee.findOneAndUpdate(
      {
        _id: id,
      },
      updateInfo,
      { new: true } 
    );
    if (!updateEmployee) {
      throw new Error(constants.employeeMessage.EMPLOYEE_NOT_FOUND);
    }
    
    return formatMongoData(updateEmployee);
  } catch (error) {
    console.log("Something went wrong: Service: updateEMployee", error);
 t
    throw new Error(error);
  }
};


module.exports.deleteEmployee = async ({ id }) => {
 
  try {
    checkObjectId(id);
    let employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      throw new Error(constants.employeeMessage.EMPLOYEE_NOT_FOUND);
    }
    return formatMongoData(employee);
  } catch (error) {
    console.log("Something went wrong: Service: deleteEmployee", error);
   
    throw new Error(error);
  }
};
