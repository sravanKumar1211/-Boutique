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
    <div className="w-full relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-[250px] sm:h-[350px] md:h-[450px]">
            <img
              src={image}
              alt="Slider Banner"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all
              ${currentIndex === index ? 'bg-[#D4AF37]' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
