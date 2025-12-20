import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";

// Create Product
export const createProducts = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
  } catch (error) {
    next(error)
  }
}

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json({ success: true, products })
  } catch (error) {
    next(error)
  }
}

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return next(new HandleError("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.status(200).json({ success: true, product })
  } catch (error) {
    next(error)
  }
}

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return next(new HandleError("Product Not Found", 404))
    }

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })
  } catch (error) {
    next(error)
  }
}

// Get single product
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return next(new HandleError("Product Not Found", 404))
    }

    res.status(200).json({ success: true, product })
  } catch (error) {
    next(error)
  }
}
