import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function Product({ product }) {
  const [rating, setRating] = useState(0)

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  return (
    <Link to={`/product/${product._id}`} className="block group w-full">
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden 
                      flex flex-col sm:flex-row gap-2 sm:gap-6
                      hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300
                      p-3 sm:p-4 h-full">

        {/* Image Container: Full width on mobile, Fixed width on Desktop */}
        <div className="w-full sm:w-40 md:w-48 shrink-0">
          <div className="relative aspect-[4/5] sm:aspect-square w-full bg-[#f7f7f7] border border-gray-100 overflow-hidden rounded-sm">
            <img
              src={product.image[0].url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Discount Tag Example - Optional aesthetic touch */}
            <div className="absolute top-2 left-2 bg-[#BF124D] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
              NEW
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          
          <div className="space-y-2">
            {/* Title - adjusted font size for mobile */}
            <h3 className="text-sm sm:text-lg font-semibold text-[#111] leading-tight 
                           group-hover:text-[#67B2D8] transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating Row - stays clean on small screens */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="scale-75 sm:scale-90 origin-left shrink-0">
                <Rating
                  value={product.ratings}
                  onRatingChange={handleRatingChange}
                  disable={true}
                />
              </div>
              <span className="text-[11px] sm:text-[12px] text-gray-400 font-medium">
                ({product.numOfReviews})
              </span>
            </div>

            {/* Aesthetic Separator */}
            <div className="w-8 h-[2px] bg-[#76153C]/20 hidden sm:block"></div>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center sm:items-end justify-between mt-3 sm:mt-0">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase font-bold hidden sm:block">Best Price</span>
              <div className="flex items-baseline">
                <span className="text-xs font-bold text-[#BF124D] mr-0.5">₹</span>
                <span className="text-xl sm:text-2xl font-bold text-[#BF124D] tracking-tight">
                  {product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Mobile: Simple text link / Desktop: Styled button */}
            <div className="flex flex-col items-end">
               <button
                className="bg-[#67B2D8] text-white sm:bg-white sm:border sm:border-[#67B2D8] sm:text-[#67B2D8] 
                           sm:hover:bg-[#67B2D8] sm:hover:text-white 
                           font-bold text-[10px] sm:text-[11px] uppercase tracking-wider
                           transition-all duration-300 px-3 py-2 sm:px-5 sm:py-2.5 rounded-sm
                           sm:shadow-[2px_2px_0px_#67B2D8] active:translate-y-0.5"
              >
                View
              </button>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default Product