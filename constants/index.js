module.exports = {
    defaultServerResponse: {
      status: 400,
      message: "",
      body: {},
    },
    employeeMessage: {
      EMPLOYEE_CREATED: "New Employee Created Successfully", //This message for Post method
      EMPLOYEE_FETCHED: "AllEemployees Fetched Successfully", //This message for Get method
      EMPLOYEE_UPDATED: "Employee's Details Updated Successfully",
      EMPLOYEE_DELETED: "Employee Deleted Successfully",
      EMPLOYEE_NOT_FOUND: "Employee Details Not Found",
    },
    requestValidateMessage: {
      BAD_REQUEST: "Invalid fields",
      TOKEN_MISSING: "Token missing from header",
    },
    databaseMessage: {
      INVALID_ID: "Invalid ID",
    },
  };
  