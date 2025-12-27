import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function Product({ product }) {
  const [rating, setRating] = useState(0)

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  return (
    <Link to={product._id}>
      <div className="bg-black border border-[#6D1A36] rounded-lg p-4 flex gap-4 hover:shadow-lg hover:shadow-[#6D1A36]/40 transition">

        {/* Image */}
        <div className="w-32 h-32 bg-gray-900 flex items-center justify-center">
          <img
            src={product.image[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 text-white">

          <div>
            <h3 className="text-lg font-semibold">
              {product.name}
            </h3>

            {/* Rating */}
            <Rating
              value={product.ratings}
              onRatingChange={handleRatingChange}
              disable={true}
            />

            <p className="text-sm text-gray-400">
              ({product.numOfReviews} reviews)
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-[#D4AF37] font-bold text-lg">
              ₹{product.price}
            </p>

            <button className="bg-[#6D1A36] hover:bg-[#D4AF37] hover:text-black transition px-4 py-1 rounded">
              Add To Cart
            </button>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default Product


