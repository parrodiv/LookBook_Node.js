const Product = require('../model/Product')
const User = require('../model/User')
const Order = require('../model/Order')
const {
  validateOrder,
  validateOrderUpdate,
} = require('../validators/orderValidator')
const { format } = require('date-fns')

const addOrder = async (req, res) => {
  const { error, value } = validateOrder(req.body)
  if (error) return res.status(422).json({ message: error.details })

  const { users, products } = req.body
  

  // check if users exist
  const usersDB = await User.find()
  console.log(usersDB);
  let usersExists = []
  users.forEach((userId) => {
    console.log(userId);
    const user = usersDB.find((userDB) => userDB.equals(userId))
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

module.exports = {
  addOrder
}
