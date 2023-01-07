const express = require('express')
const router = express.Router()
const {
  addOrder
} = require('../controllers/ordersController')

router.route('/')
  .post(addOrder) 

module.exports = router
