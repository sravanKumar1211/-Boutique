import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import {v2 as cloudinary} from 'cloudinary'

//create Product
export const createProducts = handleAsyncError(async (req, res, next) => {
  try {
    // 1. Check 'images' (matching the frontend name)
    let images = [];
    if (req.body.images) {
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
    }

    const imageLinks = [];

    // 2. Upload to Cloudinary
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        // FIXED: Changed cloudinary.v2.uploader to cloudinary.uploader
        const result = await cloudinary.uploader.upload(images[i], {
          folder: 'products'
        });
        
        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url
        });
      }
    }

    // 3. Reassign to body and set user
    req.body.images = imageLinks; 
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });

  } catch (error) {
    next(error);
  }
});

// Get all products
export const getAllProducts =handleAsyncError( async (req, res, next) => {
  try {
    //seach by query if keyword contains any name that products returns else all
    const resultsPerPage=2;
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


export const updateProduct = handleAsyncError(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new HandleError("Product Not Found", 404));
    }

    // 1. Check if new images are being sent
    let images = [];

    // Use 'images' to stay consistent with your Create controller and Frontend
    if (typeof req.body.images === 'string') {
      images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images;
    }

    // 2. If new images exist, delete old ones and upload new ones
    if (images.length > 0) {
      // Deleting images from Cloudinary
      // Safely access product.images (singular/plural check depends on your Model)
      const oldImages = product.images || []; 
      for (let i = 0; i < oldImages.length; i++) {
        await cloudinary.uploader.destroy(oldImages[i].public_id);
      }

      const imageLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: 'products',
        });

        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      // Add the new image links to the body before updating DB
      req.body.images = imageLinks;
    }

    // 3. Final update to the database with everything included
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({ 
      success: true, 
      product 
    });
    
  } catch (error) {
    next(error);
  }
});

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

//Creating and Updating Review

export const createUpdateReviewProduct = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };
  const product = await Product.findById(productId);

  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
        //  compare review.user the user posted previous review or not
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
        //  user posted previous review Update older
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  
  }
    product.numOfReviews=product.reviews.length
        //Updating average ating
  let sum=0
  product.reviews.forEach(review=>{
    sum+=review.rating
  })
  product.ratings=product.reviews.length>0?sum/product.reviews.length:0
 await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: isReviewed ? "Review updated" : "Review added"
  });
});


//Getting Reviews
export const getProductReviews=handleAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product){
      return next(new HandleError("Product not found",400))
    }
    res.status(200).json({
      success:true,
      reviews:product.reviews
    })
})

//Delete Product review
export const deleteProductReview=handleAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    if(!product){
      return next(new HandleError("Product not found",400))
    }
    const reviews=product.reviews.filter(review=>review._id.toString()!==req.query.id.toString());
    let sum=0;
    reviews.forEach(reviews=>{
      sum+=reviews.rating
    })
    const ratings=reviews.length>0?sum/reviews.length:0;
    const numOfReviews=reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
      reviews,
      ratings,
      numOfReviews
    },{
      new:true,
      runValidators:true
    })
     res.status(200).json({
      success:true,
      message:"Review deleted successfully"
    })

})

//Admin getting All products 
export const getAdminProducts=handleAsyncError(async(req,res,next)=>{
  const products=await Product.find();
  res.status(200).json({
    success:true, 
    products
  })
})