const express = require('express')
const router = express.Router()
const { createOrder } = require('../controllers/productsController')
const uploadFiles = require('../middleware/uploadFiles')

router.route('/')
  .post(uploadFiles.array('images', 4), createOrder) // max 4 files

module.exports= router