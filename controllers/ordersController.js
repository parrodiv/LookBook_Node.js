const Product = require('../model/Product')
const User = require('../model/User')
const Order = require('../model/Order')
const {
  validateOrder,
  validateOrderUpdate,
} = require('../validators/orderValidator')
const mongoose = require('mongoose')

const addOrder = async (req, res) => {
  const { error, value } = validateOrder(req.body)
  if (error) return res.status(422).json({ message: error.details })

  const { users, products } = req.body
  

  // check if users exist
  const usersDB = await User.find()
  console.log(usersDB);
  let usersExists = []
  users.forEach((userId) => {
    // equals check if ObjectIds are equals
    const user = usersDB.find((userDB) => userDB.equals(userId))
    console.log({user});
    if (user) {
      usersExists.push(true)
    } else {
      usersExists.push(false)
    }
  })
  if (usersExists.every((value) => value !== true)) {
    return res.status(422).json({ message: 'Not all users are existing' })
  }

  // check if products exist
  const productsDB = await Product.find()
  let productsExist = []
  products.forEach((productId) => {
    const product = productsDB.find((productDB) => productDB._id.equals(productId))
    if (product) {
      productsExist.push(true)
    } else {
      productsExist.push(false)
    }
  })
  if (!productsExist.every((value) => value === true)) {
    return res.status(422).json({ message: 'Not all products are existing' })
  }

  try {
    const newOrder = await Order.create({
      users,
      products,
      date: new Date()
    })
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(404).json({ message: `${error.stack}` })
  }
}


const updateOrder = async (req, res) => {
  const { error, value } = validateOrderUpdate(req.body)
  if (error) return res.status(422).json({ message: error.details })

  const id = req.params.orderId

  const { users, products } = req.body

  try {
    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json({ message: `No order matches ID ${id}` })
    }

    if (users) order.users = users
    if (products) order.products = products

    const result = await order.save()
    res.status(200).json(order)
  } catch (error) {
    res.status(404).json({ message: `${error.stack}` })
  }
}

const deleteOrder = async (req, res) => {
  if (!req.params?.orderId)
    return res.status(422).json({ message: 'Product ID required' })

  const id = req.params.orderId
  // Check valid id
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) {
    return res.status(422).json({ message: 'The provided ID is not valid' })
  }

  try {
    const orderToDelete = await Order.findById(id).exec()
    if (!orderToDelete) {
      return res.status(404).json({ message: `Order ID ${id} not found` })
    }
    const result = await Order.deleteOne({ _id: id })
    res.status(200).json({ result, orderDeleted: orderToDelete })
  } catch (error) {
    res.status(404).json({ message: `${error}` })
  }
}

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder
}
