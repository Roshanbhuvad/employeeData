const Joi = require("@hapi/joi");


const { validateRequestBody } = require('../helpers/requestHelpers')

const createEmployeeSchema = (reqData) => {
    const schema = Joi.object().keys({
        emailId: Joi.string().email(),
        mobile: Joi.string().length(12),
        salary: Joi.number().required(),
        age: Joi.number().required(),
        fullname: Joi.string().required(),
    })
    return validateRequestBody(reqData, schema)

}


const updateEmployeeSchema = (reqData) => {
const schema = Joi.object().keys({
 fullname: Joi.string(),
 salary: Joi.number(),
  age: Joi.number(),
  mobile: Joi.string().length(12),
});
return validateRequestBody(reqData, schema)
}

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema
}