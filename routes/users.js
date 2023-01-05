const express = require('express')
const router = express.Router()
const {
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController')

router.route('/')
  .post(addUser)

router.route('/:userId')
  .put(updateUser)
  .delete(deleteUser)

module.exports = router
