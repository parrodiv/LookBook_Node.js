const User = require('../model/User')
const mongoose = require('mongoose')

const addUser = async (req, res) => {
  if (!req.body?.firstname || !req.body?.surname || !req.body?.email) {
    return res
      .status(422)
      .json({ message: 'Name, surname and email are required' })
  }
  const { firstname, surname, email } = req.body
  
  try {
    const newUser = await User.create({
     firstname: firstname,
     surname: surname,
     email: email
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(404).json({ message: `${error.stack}`})
  }
}

const updateUser = async (req, res) => {
  const { firstname, surname, email } = req.body
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

    if (firstname) user.firstname = firstname
    if (surname) user.surname = surname
    if (email) user.email = email

    
    const result = await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: `${error.stack}` })
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
    res.status(200).json({result, userDeleted: userToDelete})
  } catch (error) {
    res.status(404).json({ message: `${error}` })
  }
}




module.exports = { addUser, updateUser, deleteUser }
