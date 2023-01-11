const express = require('express')
const router = express.Router()
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrdersByDate,
  getOrdersByProducts,
} = require('../controllers/ordersController')

router.route('/')
  .get(getOrders)
  .post(addOrder)

router.route('/:orderId')
  .put(updateOrder)
  .delete(deleteOrder)

router.route('/date')
  .get(getOrdersByDate)

router.route('/products')
  .get(getOrdersByProducts)

module.exports = router
