require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500

//log request into a file reqLog or reqErr
app.use(logger)

//built-in middleware to handle urlencoded data (form data)
app.use(express.urlencoded({extended: false}))

//built-in middleware for JSON
app.use(express.json())

//helmet for secure HTTP headers
app.use(helmet())

//routes
app.get('/', (req, res) => {
  console.log(req.url)
  res.status(200).json("GET ROUTE")
})



app.listen(PORT, () => console.log(`Server running on ${PORT}`))

// // verify if it's connected to MongoDB
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => console.log(`Server running on ${PORT}`))
// })
