const Joi = require('joi')

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const userSchema = Joi.object({
  firstname: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required()
})

const userUpdateSchema = Joi.object({
  firstname: Joi.string(),
  surname: Joi.string(),
  email: Joi.string().email()
})

const validateUser = validator(userSchema)
const validateUserUpdate = validator(userUpdateSchema)

module.exports = {
  validateUser,
  validateUserUpdate,
}
