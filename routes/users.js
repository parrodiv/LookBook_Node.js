const express = require('express')
const router = express.Router()
const {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser
} = require('../controllers/usersController')

router.route('/')
  .get(getUsers)
  .post(addUser)

router.route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router

