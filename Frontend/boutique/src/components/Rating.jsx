import React, { useState } from 'react'

function Rating({ value, onRatingChange, disable }) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(value || 0)

  // Handle star hover
  const handleMouseEnter = (rating) => {
    if (!disable) {
      setHoveredRating(rating)
    }
  }

  // Mouse Leave
  const handleMouseLave = () => {
    if (!disable) {
      setHoveredRating(0)
    }
  }

  // Handle Click
  const handleClick = (rating) => {
    if (!disable) {
      setSelectedRating(rating)
      if (onRatingChange) {
        onRatingChange(rating)
      }
    }
  }

  // Generate stars
  const generateStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || selectedRating)

      stars.push(
        <span
          key={i}
          onMouseEnter={() => handleMouseEnter(i)}   
          onMouseLeave={handleMouseLave}             
          onClick={() => handleClick(i)}             
          className={`text-xl transition
            ${isFilled ? 'text-[#D4AF37]' : 'text-gray-400'}
            ${disable ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
          `}
        >
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">{generateStars()}</div>
    </div>
  )
}

export default Rating




