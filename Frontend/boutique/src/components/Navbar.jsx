
import React, { useState } from 'react'
import {
  Search,
  ShoppingCart,
  Menu,
  Close,
  Home,
  Info,
  Store,
  ContactMail,
  PersonAdd,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthenticated = false

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-[#6D1A36]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-widest text-[#D4AF37]"
        >
          BRAND
        </Link>

        {/* Search – Desktop */}
        <form className="hidden md:flex items-center border border-[#D4AF37] rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search products"
            className="px-3 py-2 bg-black text-white placeholder-gray-400 outline-none"
          />
          <button className="bg-[#D4AF37] px-3 py-2 text-black hover:bg-[#6D1A36] hover:text-white transition">
            <Search />
          </button>
        </form>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {[
            { to: '/', icon: <Home fontSize="small" />, label: 'Home' },
            { to: '/about', icon: <Info fontSize="small" />, label: 'About' },
            { to: '/shop', icon: <Store fontSize="small" />, label: 'Shop' },
            { to: '/contact', icon: <ContactMail fontSize="small" />, label: 'Contact' },
          ].map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="flex items-center gap-1 hover:text-[#D4AF37] transition"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="hover:text-[#D4AF37]" />
            <span className="absolute -top-2 -right-2 bg-[#6D1A36] text-xs w-5 h-5 flex items-center justify-center rounded-full border border-[#D4AF37]">
              0
            </span>
          </Link>

          {/* Profile */}
          {!isAuthenticated && (
            <Link to="/register" className="hover:text-[#D4AF37]">
              <PersonAdd />
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#D4AF37]"
          >
            {isMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-[#6D1A36]">
          <ul
            className="flex flex-col gap-4 p-4 text-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>
              <Link to="/" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <Home /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <Info /> About
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <Store /> Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2 hover:text-[#D4AF37]">
                <ContactMail /> Contact
              </Link>
            </li>

            {/* Mobile Search */}
            <form className="flex mt-2 border border-[#D4AF37] rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-3 py-2 bg-black text-white outline-none"
              />
              <button className="bg-[#D4AF37] px-3 py-2 text-black">
                <Search />
              </button>
            </form>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar


