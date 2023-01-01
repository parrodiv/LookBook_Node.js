const multer = require('multer')
const path = require('path')
const uniqid = require('uniqid')

// upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    //replace the name of the file
    cb(null, req.body.name + uniqid() + path.extname(file.originalname))
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
      cb(null, false)
      throw new Error("Only jpg, jpeg, png formats accepted")
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024  // max 4MB
  }
})


module.exports = upload