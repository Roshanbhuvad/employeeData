const Joi = require('@hapi/joi')

exports.validateRequestBody = (reqData, schema) => {
  const validation = Joi.validate(reqData, schema, { abortEarly: false, convert: false })
  if (validation.error != null) {
    let messages = []
    validation.error.details.forEach((error) => {
      const msg = `'${error.path.join(".")}' - ${error.message.replace(
        error.path[error.path.length - 1],
        ""
      )}`;
      messages.push({
        field: error.path[0],
        description: msg.replace(/ ""/g, "")
      })
    })
    return {
      error: messages,
      isValid: false
    }
  }
  return {
    isValid: true
  }
}