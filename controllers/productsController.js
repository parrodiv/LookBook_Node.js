const Product = require('../model/Product')
const fs = require('fs')
const path = require('path')


const addProduct = async (req, res) => {
  
  if (!req.body?.name) {
    return res
      .status(400)
      .json({ message: 'Name is required' })
  }

  let pathImgs = []

  if (req.files){ 
    console.log(req.files);
    req.files.forEach(file => {
      pathImgs.push(file.path)
    })
  }
  
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      images: pathImgs

      // ********* SAVE AS BUFFER ****
      // images: {
      //   data: fs.readFileSync(
      //     path.join(__dirname, '..', '/images/', req.file.filename)
      //   ),
      //   contentType: req.file.mimetype,
      // },
    })
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({message: 'Error: ' + error})
    throw new Error(error)
  }
}

module.exports = { addProduct }