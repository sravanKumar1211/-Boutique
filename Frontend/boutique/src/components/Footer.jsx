import React from 'react'
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  YouTube,
  LocationOn,
} from '@mui/icons-material'

function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 border-t border-[#6D1A36]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 – Contact */}
        <div className="space-y-4">
          <h3 className="text-[#D4AF37] text-lg font-semibold tracking-widest uppercase">
            Contact Us
          </h3>
          <p className="flex items-center gap-2 hover:text-white transition">
            <Phone fontSize="small" /> +91 9876543210
          </p>
          <p className="flex items-center gap-2 hover:text-white transition">
            <Mail fontSize="small" /> sravan@gmail.com
          </p>
        </div>

        {/* Column 2 – Social */}
        <div className="space-y-4">
          <h3 className="text-[#D4AF37] text-lg font-semibold tracking-widest uppercase">
            Follow Me
          </h3>
          <div className="flex gap-4">
            <a className="hover:text-[#D4AF37] transition">
              <Facebook />
            </a>
            <a className="hover:text-[#D4AF37] transition">
              <Instagram />
            </a>
            <a className="hover:text-[#D4AF37] transition">
              <YouTube />
            </a>
          </div>
        </div>

        {/* Column 3 – About */}
        <div className="space-y-4">
          <h3 className="text-[#D4AF37] text-lg font-semibold tracking-widest uppercase">
            About
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            A fashion-forward boutique experience crafted with elegance,
            bold aesthetics, and premium design inspired by luxury brands.
          </p>
        </div>

        {/* Column 4 – Address */}
        <div className="space-y-4">
          <h3 className="text-[#D4AF37] text-lg font-semibold tracking-widest uppercase">
            Address
          </h3>
          <p className="flex items-start gap-2 text-sm text-gray-400">
            <LocationOn fontSize="small" />
            Hyderabad, Telangana, India
          </p>

          {/* Map Placeholder */}
          <div className="w-full h-32 border border-[#6D1A36] rounded-md flex items-center justify-center text-xs text-gray-500">
            Google Map Location
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-14 border-t border-[#6D1A36] py-6 text-center text-sm text-gray-500">
        © 2025{' '}
        <span className="text-[#D4AF37] font-medium tracking-wide">
          Sravan Kumar
        </span>
        . All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
