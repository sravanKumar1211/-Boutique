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

  // FIX: Destructure reviewSuccess and reviewLoading from product state, not cart state
  const { 
    loading, 
    error, 
    product, 
    reviewSuccess, 
    reviewLoading 
  } = useSelector((state) => state.product);

  const { 
    loading: cartLoading, 
    error: cartError, 
    success, 
    message 
  } = useSelector((state) => state.cart)

  const handleRatingChange = (newRating) => {
    setUserRating(newRating)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating) {
      toast.error('Please select a rating')
      return
    }
    dispatch(createReview({
      rating: userRating,
      comment,
      productId: id
    }))
  }

  // Effect to handle review success
  useEffect(() => {
    if (reviewSuccess) {
      toast.success('Review created successfully');
      setUserRating(0);
      setComment('')
      
      // Clear the success flag and refresh product data to show new review
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
    if (id) {
      dispatch(getProductDetails(id))
    }
    return () => {
      dispatch(removeErrors())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      toast.error(error.message || error, { position: 'top-center' });
      dispatch(removeErrors())
    }
    if (cartError) {
      toast.error(cartError, { position: 'top-center' });
      dispatch(removeErrors())
    }
  }, [dispatch, error, cartError])

  useEffect(() => {
    if (success) {
      toast.success(message, { position: 'top-center' });
      dispatch(removeMessage())
    }
  }, [dispatch, success, message])

  const addToCart = () => {
    dispatch(addItemsToCart({ id, quantity }))
  }

  return (
    <>
      <PageTitle title={product ? `${product.name}` : 'Loading...'} />
      <Navbar />

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
              <h2 className="text-2xl font-semibold tracking-wide">{product.name}</h2>
              <p className="text-gray-400">{product.description}</p>

              <div className="flex items-center gap-2">
                <Rating value={product.ratings} disable={true} />
                <span className="text-sm text-gray-400">
                  {product.numOfReviews} Reviews
                </span>
              </div>

              <p className="text-2xl font-bold text-[#D4AF37]">₹{product.price}/-</p>

              <p className="text-sm">
                <span className="text-gray-400">Status:- </span>
                <span className={product.stock < 1 ? "text-red-400" : "text-green-400"}>
                  {product.stock < 1 ? "Out of Stock" : `In Stock (${product?.stock} available)`}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Quantity</span>
                <div className="flex items-center border border-[#6D1A36] rounded overflow-hidden">
                  <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-900 hover:bg-[#6D1A36] transition-colors">-</button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-12 text-center bg-black outline-none border-x border-[#6D1A36]"
                  />
                  <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-900 hover:bg-[#6D1A36] transition-colors">+</button>
                </div>
              </div>

              <button 
                onClick={addToCart}
                disabled={product.stock < 1}
                className={`mt-4 transition px-6 py-3 rounded font-medium w-full sm:w-fit ${
                  product.stock < 1 ? "bg-gray-700 cursor-not-allowed" : "bg-[#6D1A36] hover:bg-[#D4AF37] hover:text-black"
                }`}
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Review Form */}
          <div className="max-w-7xl mx-auto mt-14 border-t border-[#6D1A36] pt-10">
            <form className="bg-gray-900 border border-[#6D1A36] rounded-lg p-6 space-y-4 max-w-xl" onSubmit={handleReviewSubmit}>
              <h3 className="text-lg font-semibold">Write a Review</h3>

              <Rating
                value={userRating}
                disable={false}
                onRatingChange={handleRatingChange}
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Write your review..!"
                className="w-full h-28 bg-black border border-[#6D1A36] rounded p-3 outline-none resize-none focus:border-[#D4AF37] transition-colors"
              />

              <button 
                disabled={reviewLoading} // Prevent double submission
                className="bg-[#6D1A36] hover:bg-[#D4AF37] hover:text-black transition px-6 py-2 rounded disabled:opacity-50"
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="max-w-7xl mx-auto mt-14">
            <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

            {product.reviews && product.reviews.length > 0 ? (
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

export default ProductDetails;