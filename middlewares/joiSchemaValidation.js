
const Joi = require("@hapi/joi");
const constants = require("../constants");

const validateObjectSchema = (data, schema) => {

  const result = Joi.validate(data, schema, { convert: false });
  console.log("result",result)
  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      
      return {

        error: value.message, //getting the message and path error details from errorDetails object
        path: value.path,
      };
    });
    return errorDetails;
  }
  return null;
  //console.log("errorDetails", errorDetails);
};

module.exports.validateBody = (schema) => {
  
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.body, schema); //For the data get it from the req.body
    console.log("error",error)
    if (error) {
      //here If there is any error then respond the client with error
      response.body = error;
      response.message = constants.requestValidateMessage.BAD_REQUEST; 
      return res.status(response.status).send(response); 
    }
    return next(); 
  };
};

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.query, schema); 

    if (error) {
      response.body = error;
      response.message = constants.requestValidateMessage.BAD_REQUEST; 
      return res.status(response.status).send(response); 
    }
    return next();
  };
};
