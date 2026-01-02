import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function Product({ product }) {
  const [rating, setRating] = useState(0)

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden 
                      flex flex-col sm:flex-row gap-0 sm:gap-6
                      hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300
                      p-3 sm:p-4 min-h-[180px]">

        {/* Fixed Image Container */}
        <div className="w-full sm:w-48 shrink-0">
          <div className="relative aspect-square w-full bg-[#f7f7f7] border border-gray-100 overflow-hidden rounded-sm">
            <img
              src={product.image[0].url}
              alt={product.name}
              // object-cover ensures the image fills the fixed dimensions perfectly
              // aspect-square forces all cards to have the same image height/width
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between flex-1 py-2 sm:py-0">
          
          <div className="space-y-1">
            {/* Title */}
            <h3 className="text-base sm:text-lg font-medium text-[#111] leading-tight 
                           group-hover:text-[#67B2D8] transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating Row */}
            <div className="flex items-center gap-2 mt-1">
              <div className="scale-90 origin-left">
                <Rating
                  value={product.ratings}
                  onRatingChange={handleRatingChange}
                  disable={true}
                />
              </div>
              <span className="text-[12px] text-[#67B2D8] font-medium hover:underline">
                {product.numOfReviews} reviews
              </span>
            </div>

            {/* Aesthetic Separator (Amazon Style) */}
            <div className="w-10 h-[2px] bg-[#76153C]/20 mt-2"></div>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-end justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter font-bold">Best Price</span>
              <div className="flex items-start">
                <span className="text-sm font-bold mt-1 mr-0.5 text-[#BF124D]">₹</span>
                <span className="text-2xl font-bold text-[#BF124D] tracking-tight">
                  {product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="bg-white border border-[#67B2D8] text-[#67B2D8] 
                         hover:bg-[#67B2D8] hover:text-white 
                         font-bold text-[11px] uppercase tracking-widest
                         transition-all duration-300 px-5 py-2.5 rounded-sm
                         shadow-[2px_2px_0px_#67B2D8] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              View Details
            </button>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default Product