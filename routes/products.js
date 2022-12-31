const express = require('express')
const router = express.Router()
const { createOrder } = require('../controllers/productsController')
const upload = require('../middleware/uploadFiles')

router.route('/')
  .post(upload.array('images', 4), createOrder) // max 4 files

module.exports= router