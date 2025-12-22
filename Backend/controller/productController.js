import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// Create Product
export const createProducts =handleAsyncError(async (req, res, next) => {
  try {
    req.body.user=req.user.id;//gives the user id
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
  } catch (error) {
    next(error)
  }
})

// Get all products
export const getAllProducts =handleAsyncError( async (req, res, next) => {
  try {
    //seach by query if keyword contains any name that products returns else all
    const resultsPerPage=9;
   const apiFeatures= new APIFunctionality(Product.find(),req.query).search().filter();
   //getting filtered query before pagination
   const filteredQuery=apiFeatures.query.clone();
   const productCount=await filteredQuery.countDocuments();
   //calculate total pages based on filter count
   const totalPages=Math.ceil(productCount/resultsPerPage);
   const page=Number(req.query.page)||1;
   if(page>totalPages && productCount>0){
      return next(new HandleError("This page Does not exist", 404))
   }
   //Apply pagination
    apiFeatures.pagination(resultsPerPage);
    const products = await apiFeatures.query
    if(!products || products.length==0){
      return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({ success: true, products,productCount,resultsPerPage,totalPages,currentPage:page })
  } catch (error) {
    next(error)
  }
})

// Update product
export const updateProduct =handleAsyncError( async (req, res, next) => {
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
})

// Delete product
export const deleteProduct =handleAsyncError( async (req, res, next) => {
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
})

// Get single product
export const getSingleProduct =handleAsyncError( async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return next(new HandleError("Product Not Found", 404))
    }

    res.status(200).json({ success: true, product })
  } catch (error) {
    next(error)
  }
})
