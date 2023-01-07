const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require('joi-objectid')(Joi)

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const orderSchema = Joi.object({
  users: Joi.array().items(Joi.objectId()).required(),
  products: Joi.array().items(Joi.objectId()).required(),
})

const orderUpdateSchema = Joi.object({
  users: Joi.array().items(Joi.objectId()),
  products: Joi.array().items(Joi.objectId()),

})

const validateOrder = validator(orderSchema)
const validateOrderUpdate = validator(orderUpdateSchema)

module.exports = {
  validateOrder,
  validateOrderUpdate,
}