const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  images: {
    type: [String],
    required: true
  }, 
  // images: {
  //   data: [Buffer],
  //   contentType: String
  // }, 
   
})

module.exports = mongoose.model('Product', productSchema)