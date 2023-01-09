const express = require('express')
const router = express.Router()
const {
  addOrder, updateOrder, deleteOrder
} = require('../controllers/ordersController')

router.route('/')
  .post(addOrder) 

router.route('/:orderId')
  .put(updateOrder)
  .delete(deleteOrder)

module.exports = router
