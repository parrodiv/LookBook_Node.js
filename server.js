require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const {logger} = require('./middleware/logEvents')
const connectDB = require('./config/connectDB')
mongoose.set('strictQuery', true)
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

//connect to MongoDB
connectDB()

//check allowed origins by CORS
// without corsOptions cors will grant free access to all domains
app.use(cors(corsOptions))

//log request into a file reqLog or errLog
app.use(logger)

//built-in middleware to handle urlencoded data (form data)
app.use(express.urlencoded({ extended: true}))

//built-in middleware for JSON
app.use(express.json())

//helmet for secure HTTP headers
app.use(helmet())

//serve static files
app.use('/images', express.static('images'))

//routes
app.use('/products', require('./routes/products'))
app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))

//All HTTP methods
app.all('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})

//errorHandler middleware
app.use(errorHandler)

// verify if it's connected to MongoDB
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})
