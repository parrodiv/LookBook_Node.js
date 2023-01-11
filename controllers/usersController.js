const User = require('../model/User')
const mongoose = require('mongoose')
const {
  validateUser,
  validateUserUpdate,
} = require('../validators/userValidator')

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getUser = async (req, res) => {
  const id = req.params.userId

  // Check valid id
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) {
    return res.status(400).json({ message: 'The provided ID is not valid' })
  }

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: `No user matches ID ${id}` })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addUser = async (req, res) => {
  const { error, value } = validateUser(req.body)
  if (error) return res.status(422).json({ message: error.details })

  const { firstname, surname, email } = req.body

  try {
    const newUser = await User.create({
      firstname: firstname,
      surname: surname,
      email: email,
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  const { error, value } = validateUserUpdate(req.body)
  if (error) return res.status(422).json({ message: error.details })

  const id = req.params.userId

  const { firstname, surname, email } = req.body

  // Check valid id
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) {
    return res.status(400).json({ message: 'The provided ID is not valid' })
  }

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: `No user matches ID ${id}` })
    }

    if (firstname) user.firstname = firstname
    if (surname) user.surname = surname
    if (email) user.email = email

    const result = await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  if (!req.params?.userId)
    return res.status(422).json({ message: 'Product ID required' })

  const id = req.params.userId
  // Check valid id
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) {
    return res.status(422).json({ message: 'The provided ID is not valid' })
  }

  try {
    const userToDelete = await User.findById(id).exec()
    if (!userToDelete) {
      return res.status(404).json({ message: `User ID ${id} not found` })
    }
    const result = await User.deleteOne({ _id: id })
    res.status(200).json({ result, userDeleted: userToDelete })
  } catch (error) {
    res.status(500).json({ message: `${error}` })
  }
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser }
