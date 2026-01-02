import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice'
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice'

function ProductDetails() {
  const [userRating, setUserRating] = useState(0)
  const [quantity, setQuantity] = useState(1) 
  const [comment, setComment] = useState('')
  
  const dispatch = useDispatch();
  const { id } = useParams()

  const { loading, error, product, reviewSuccess, reviewLoading } =
    useSelector((state) => state.product);

  const { loading: cartLoading, error: cartError, success, message } =
    useSelector((state) => state.cart)

  const handleRatingChange = (newRating) => setUserRating(newRating)

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating) {
      toast.error('Please select a rating')
      return
    }
    dispatch(createReview({ rating: userRating, comment, productId: id }))
  }

  useEffect(() => {
    if (reviewSuccess) {
      toast.success('Review created successfully');
      setUserRating(0);
      setComment('')
      dispatch(removeSuccess()) 
      dispatch(getProductDetails(id))
    }
  }, [reviewSuccess, id, dispatch])

  const increaseQuantity = () => {
    if (product?.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (id) dispatch(getProductDetails(id))
    return () => dispatch(removeErrors())
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      toast.error(error.message || error)
      dispatch(removeErrors())
    }
    if (cartError) {
      toast.error(cartError)
      dispatch(removeErrors())
    }
  }, [dispatch, error, cartError])

  useEffect(() => {
    if (success) {
      toast.success(message)
      dispatch(removeMessage())
    }
  }, [dispatch, success, message])

  const addToCart = () => dispatch(addItemsToCart({ id, quantity }))

  //console.log(product)

  return (
    <>
      <PageTitle title={product ? `${product.name}` : 'Loading...'} />
      <Navbar />

      {loading ? (
        <Loader />
      ) : product ? (
        <div className="bg-white text-black px-4 sm:px-6 py-10">
          
          {/* TOP SECTION */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Image */}
            <div className="border border-[#76153C]/25 rounded-md p-6 flex items-center justify-center h-[320px] sm:h-[420px]">
              <img
                src={product.image && product.image[0] ? product.image[0].url : ''}
                alt={product.name}
                className="max-h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-2">
                <Rating value={product.ratings} disable={true} />
                <span className="text-sm text-gray-500">
                  {product.numOfReviews} ratings
                </span>
              </div>

              <p className="text-2xl font-bold text-[#BF124D]">
                ₹{product.price}
              </p>

              <p className="text-sm">
                <span className="text-gray-500">Availability: </span>
                <span className={product.stock < 1 ? "text-[#BF124D]" : "text-[#67B2D8]"}>
                  {product.stock < 1 ? "Out of Stock" : `In Stock (${product.stock})`}
                </span>
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Qty</span>
                <div className="flex items-center border border-[#76153C]/30 rounded">
                  <button onClick={decreaseQuantity} className="px-3 py-1 hover:bg-[#76153C]/10">-</button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-12 text-center outline-none"
                  />
                  <button onClick={increaseQuantity} className="px-3 py-1 hover:bg-[#76153C]/10">+</button>
                </div>
              </div>

              <button
                onClick={addToCart}
                disabled={product.stock < 1}
                className={`mt-4 px-6 py-3 rounded text-sm font-semibold transition
                ${
                  product.stock < 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#67B2D8] hover:bg-[#BF124D] hover:text-white"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* REVIEW FORM */}
          <div className="max-w-7xl mx-auto mt-16 border-t border-[#76153C]/25 pt-10">
            <form
              className="border border-[#76153C]/25 rounded-md p-6 space-y-4 max-w-xl"
              onSubmit={handleReviewSubmit}
            >
              <h3 className="text-lg font-semibold">Write a Review</h3>

              <Rating value={userRating} disable={false} onRatingChange={handleRatingChange} />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Share your experience"
                className="w-full h-28 border border-[#76153C]/30 rounded p-3 outline-none resize-none focus:border-[#67B2D8]"
              />

              <button
                disabled={reviewLoading}
                className="bg-[#76153C] hover:bg-[#67B2D8] hover:text-black transition px-6 py-2 rounded text-sm font-semibold disabled:opacity-50"
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* REVIEWS */}
          <div className="max-w-7xl mx-auto mt-16">
            <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-[#76153C]/25 rounded-md p-5 space-y-2 max-w-xl mb-4"
                >
                  <Rating value={review.rating} disable={true} />
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500">— {review.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  )
}

export default ProductDetails
