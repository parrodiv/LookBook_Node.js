const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController')
const upload = require('../middleware/uploadFiles')

router.route('/')
  .get(getProducts)
  .post(upload.array('images', 4), addProduct) // max 4 files

router.route('/:productId')
  .get(getProduct)
  .put(upload.array('images', 4), updateProduct)
  .delete(deleteProduct)


module.exports = router
