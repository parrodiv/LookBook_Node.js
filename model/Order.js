const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
  users: {
    type:  [Schema.Types.ObjectId],
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  date: {
    type: Date,
  }
})

module.exports = mongoose.model('Order', orderSchema)
