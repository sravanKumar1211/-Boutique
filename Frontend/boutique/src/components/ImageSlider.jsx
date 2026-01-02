import React, { useEffect, useState } from 'react'
import img1 from '../images/image1.webp'
import img2 from '../images/image2.jpg'
import img3 from '../images/image3.jpg'
import img4 from '../images/image4.jpg'

const images = [img1, img2, img3, img4]

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full relative overflow-hidden bg-[#5A0E24]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full 
                       h-[220px] 
                       sm:h-[320px] 
                       md:h-[420px] 
                       lg:h-[520px]"
          >
            <img
              src={image}
              alt="Slider Banner"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay (Amazon-style depth) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#5A0E24]/60 pointer-events-none" />

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full
              transition-all duration-300
              ${
                currentIndex === index
                  ? 'bg-[#67B2D8] scale-110'
                  : 'bg-[#BF124D]/60 hover:bg-[#67B2D8]'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
