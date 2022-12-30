const multer = require('multer')
const { format } = require('date-fns')
const path = require('path')

// upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    //replace the name of the file
    cb(null, req.body.name + format(new Date(), 'dd_MM_yyyy_HH:mm:ss') + path.extname(file.originalname))
  },
})

const upload = multer({ 
  storage: storage,
  fileFilter : (req, file, cb) => {
    const formatsAccepted = [
      'image/png',
      'image/jpg',
      'image/jpeg'
    ]
    if (formatsAccepted.includes(file.mimetype)) {
      cb(null, true)
    } else {
      console.log('Only jpg, png and jpeg files supported');
      cb(null, false)
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024  // max 4MB
  }
})

module.exports = upload