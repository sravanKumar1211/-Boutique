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
    <footer className="bg-black text-gray-300 pt-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 – Contact */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold tracking-wider uppercase">
            Contact Us
          </h3>
          <p className="flex items-center gap-2">
            <Phone fontSize="small" /> +91 9876543210
          </p>
          <p className="flex items-center gap-2">
            <Mail fontSize="small" /> sravan@gmail.com
          </p>
        </div>

        {/* Column 2 – Social */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold tracking-wider uppercase">
            Follow Me
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-400 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <YouTube />
            </a>
          </div>
        </div>

        {/* Column 3 – About */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold tracking-wider uppercase">
            About
          </h3>
          <p className="text-sm leading-relaxed">
            A modern fashion-inspired brand experience blending elegance,
            creativity, and minimalism for a premium digital presence.
          </p>
        </div>

        {/* Column 4 – Address */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold tracking-wider uppercase">
            Address
          </h3>
          <p className="flex items-start gap-2 text-sm">
            <LocationOn fontSize="small" />
            Hyderabad, Telangana, India
          </p>
          <div className="w-full h-32 bg-gray-800 rounded-md flex items-center justify-center text-gray-400 text-sm">
            Google Map Placeholder
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 mt-12 py-6 text-center text-sm text-gray-500">
        © 2025 <span className="text-white font-medium">Sravan Kumar</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

