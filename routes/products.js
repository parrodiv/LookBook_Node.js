const express = require('express')
const router = express.Router()
const { addProduct} = require('../controllers/productsController')
const upload = require('../middleware/uploadFiles')

router.route('/')
  .post(upload.array('images', 4), addProduct) // max 4 files

module.exports= router