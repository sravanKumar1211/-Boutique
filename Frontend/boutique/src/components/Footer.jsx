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
    <footer className="bg-[#5A0E24] text-gray-200">
      {/* Top Section */}
      <div className="bg-[#76153C]">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 – Contact */}
          <div className="space-y-4">
            <h3 className="text-[#BF124D] text-sm font-bold uppercase tracking-wider">
              Contact Us
            </h3>
            <p className="flex items-center gap-2 text-sm hover:text-[#67B2D8] transition">
              <Phone fontSize="small" /> +91 9876543210
            </p>
            <p className="flex items-center gap-2 text-sm hover:text-[#67B2D8] transition">
              <Mail fontSize="small" /> sravan@gmail.com
            </p>
          </div>

          {/* Column 2 – Social */}
          <div className="space-y-4">
            <h3 className="text-[#BF124D] text-sm font-bold uppercase tracking-wider">
              Follow Me
            </h3>
            <div className="flex gap-4">
              <a className="text-gray-300 hover:text-[#67B2D8] transition">
                <Facebook />
              </a>
              <a className="text-gray-300 hover:text-[#67B2D8] transition">
                <Instagram />
              </a>
              <a className="text-gray-300 hover:text-[#67B2D8] transition">
                <YouTube />
              </a>
            </div>
          </div>

          {/* Column 3 – About */}
          <div className="space-y-4">
            <h3 className="text-[#BF124D] text-sm font-bold uppercase tracking-wider">
              About
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              A fashion-forward boutique experience crafted with elegance,
              bold aesthetics, and premium design inspired by luxury brands.
            </p>
          </div>

          {/* Column 4 – Address */}
          <div className="space-y-4">
            <h3 className="text-[#BF124D] text-sm font-bold uppercase tracking-wider">
              Address
            </h3>
            <p className="flex items-start gap-2 text-sm text-gray-300">
              <LocationOn fontSize="small" />
              Hyderabad, Telangana, India
            </p>

            {/* Map Placeholder */}
            <div className="w-full h-28 bg-[#5A0E24] border border-[#BF124D] rounded-md flex items-center justify-center text-xs text-gray-400">
              Google Map Location
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#5A0E24] border-t border-[#BF124D] py-5 text-center text-xs text-gray-300">
        © 2025{' '}
        <span className="text-[#67B2D8] font-semibold tracking-wide">
          Sravan Kumar
        </span>
        . All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
