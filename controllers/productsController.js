const Product = require('../model/Product')
const fsPromises = require('fs').promises
const path = require('path')
const mongoose = require('mongoose')

const addProduct = async (req, res) => {
  if (!req.body?.name) {
    return res.status(422).json({ message: 'Name is required' })
  }

  let pathImgs = []

  if (req.files.length !== 0) {
    console.log(req.files)
    req.files.forEach((file) => {
      pathImgs.push(file.path)
    })
  } else {
    return res.status(422).json({ message: 'Images are required' })
  }


  try {
    const newProduct = await Product.create({
      name: req.body.name,
      images: pathImgs,

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
    res.status(404).json({ message: 'Error: ' + error })
    throw new Error(error)
  }
}

const updateProduct = async (req, res) => {
  const { name } = req.body
  const id = req.params.productId

  // Check valid id
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) {
    return res.status(400).json({ message: 'The provided ID is not valid' })
  }

  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: `No product matches ID ${id}` })
    }

    if (name) product.name = name

    if (req.files.length !== 0) {
      let pathImgs = []
      req.files.forEach((file) => {
        pathImgs.push(file.path)
      })
      product.images = pathImgs
    }
    const result = await product.save()
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ message: `${error.stack}` })
  }
}

const deleteProduct = async (req, res) => {
  if (!req.params?.productId)
    return res.status(422).json({ message: 'Product ID required' })

  const id = req.params.productId
  // Check valid id
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) {
    return res.status(400).json({ message: 'The provided ID is not valid' })
  }

  try {
    const productToDelete = await Product.findById(id).exec()
    console.log(productToDelete)
    if (!productToDelete) {
      return res.status(404).json({ message: `Product ID ${id} not found` })
    }
    const { images } = productToDelete

    // delete images of the product
    images.forEach(async (image) => {
      const file = image.split('/')[1] // get image's filename
      try {
        await fsPromises.unlink(path.join(__dirname, '..', 'images', file))
      } catch (error) {
        throw new Error`Failed to delete files: ${error}`()
      }
    })

    const result = await Product.deleteOne({ _id: id })
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: `${error}` })
  }
}

module.exports = { addProduct, updateProduct, deleteProduct }
