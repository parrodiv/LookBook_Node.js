const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    console.log(allowedOrigins.includes(origin))
    if(allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions