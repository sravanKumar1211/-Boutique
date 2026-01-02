import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#5A0E24] z-50">
      
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#76153C]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#67B2D8] border-r-[#67B2D8] animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-sm tracking-widest uppercase text-[#BF124D]">
        Loading
      </p>
    </div>
  )
}

export default Loader
