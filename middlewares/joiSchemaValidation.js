
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
  /*Since this middleware that  will be adding to the routes(productRoutes.js) as a sub-stack middleware
        so this middleware is going to have the access to the request and response and next function like a (req, res, next) */

  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.body, schema); //For the data get it from the req.body
    console.log("error",error)
    if (error) {
      //here If there is any error then respond the client with error
      response.body = error;
      response.message = constants.requestValidateMessage.BAD_REQUEST; // Here calling the requestValidateMessage object in index.js from constants
      return res.status(response.status).send(response); //Here  sending the response from middleware itself  back to the client no need to further controller
    }
    return next(); //otherwise call the next function from the middleware which is create productController if there is no any error
    //If the next() function is called it is going to the createProduct  function in productController.js
  };
};

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.query, schema); //req.query holds the variable which we pass in the API like query parameters

    if (error) {
      response.body = error;
      response.message = constants.requestValidateMessage.BAD_REQUEST; // Here we are calling the requestValidateMessage object in index.js from constants
      return res.status(response.status).send(response); //Here we are sending the response from middleware itself  back to the client no need to further controller
    }
    return next();
  };
};
