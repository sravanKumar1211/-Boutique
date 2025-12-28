import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import {toast} from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails, removeErrors } from '../features/products/productSlice'

function ProductDetails() {
  const [userRating, setUserRating] = useState(0)

  const handleRatingChange = (newRating) => {
    setUserRating(newRating)
  }

  const { loading, error, product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id))
    }
    return () => {
      dispatch(removeErrors())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 5000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  return (
    <>
      <PageTitle title={product ? `${product.name}` : 'Loading...'} />
      <Navbar />

      {/* 2. Added check: Only render if NOT loading AND product EXISTS */}
      {loading ? (
        <Loader />
      ) : product ? ( 
        <div className="bg-black text-white px-4 sm:px-8 py-10">

          {/* Top Section */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Product Images */}
            <div className="bg-gray-900 border border-[#6D1A36] rounded-lg flex items-center justify-center h-[350px] sm:h-[450px]">
              <img
                src={product.images && product.images[0] ? product.images[0].url : 'null'}
                alt={product.name}
                className="h-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">

              <h2 className="text-2xl font-semibold tracking-wide">
                {product.name}
              </h2>

              <p className="text-gray-400">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Rating value={product.ratings} disable={true} />
                <span className="text-sm text-gray-400">
                  {product.numOfReviews} Reviews
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-[#D4AF37]">
                ₹{product.price}/-
              </p>

              {/* Stock */}
              <p className="text-sm">
                <span className="text-gray-400">Status:-{`${product.stock}`}</span>
                <span className={product.Stock < 1 ? "text-red-400" : "text-green-400"}>
                  {product.Stock < 1 ? "Out of Stock" : `In Stock (${product.Stock} available)`}
                </span>
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Quantity</span>
                <div className="flex items-center border border-[#6D1A36] rounded">
                  <button className="px-3 py-1 hover:bg-[#6D1A36]">-</button>
                  <input
                    type="text"
                    value={1}
                    readOnly
                    className="w-10 text-center bg-black outline-none"
                  />
                  <button className="px-3 py-1 hover:bg-[#6D1A36]">+</button>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="mt-4 bg-[#6D1A36] hover:bg-[#D4AF37] hover:text-black transition px-6 py-3 rounded font-medium w-full sm:w-fit">
                Add To Cart
              </button>
            </div>
          </div>

          {/* Review Form */}
          <div className="max-w-7xl mx-auto mt-14 border-t border-[#6D1A36] pt-10">
            <form className="bg-gray-900 border border-[#6D1A36] rounded-lg p-6 space-y-4 max-w-xl">
              <h3 className="text-lg font-semibold">
                Write a Review
              </h3>

              <Rating
                value={0}
                disable={false}
                onRatingChange={handleRatingChange}
              />

              <textarea
                placeholder="Write your review..!"
                className="w-full h-28 bg-black border border-[#6D1A36] rounded p-3 outline-none resize-none"
              />

              <button className="bg-[#6D1A36] hover:bg-[#D4AF37] hover:text-black transition px-6 py-2 rounded">
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews Section */}
          <div className="max-w-7xl mx-auto mt-14">
            <h3 className="text-xl font-semibold mb-6">
              Customer Reviews
            </h3>

            {/* Check if reviews exist */}
            {product.reviews && product.reviews[0] ? (
               product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-900 border border-[#6D1A36] rounded-lg p-5 space-y-3 max-w-xl mb-4">
                  <Rating value={review.rating} disable={true} />
                  <p className="text-gray-300">{review.comment}</p>
                  <p className="text-sm text-gray-500">— {review.name}</p>
                </div>
               ))
            ) : (
              <p className="text-gray-400 italic">No reviews yet for this product.</p>
            )}
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  )
}

export default ProductDetails