const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)