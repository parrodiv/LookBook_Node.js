require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const logger = require('./middleware/logEvents')
const connectDB = require('./config/connectDB')
mongoose.set('strictQuery', true)
const PORT = process.env.PORT || 3500

//connect to MongoDB
connectDB()

//check allowed origins by CORS
app.use(cors(corsOptions))

//log request into a file reqLog or reqErr
app.use(logger)

//built-in middleware to handle urlencoded data (form data)
app.use(express.urlencoded({ extended: false }))

//built-in middleware for JSON
app.use(express.json())

//helmet for secure HTTP headers
app.use(helmet())

//routes
app.get('/', (req, res) => {
  console.log(req.url)
  res.status(200).json('GET ROUTE')
})

//All HTTP methods
app.all('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})


// verify if it's connected to MongoDB
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})
