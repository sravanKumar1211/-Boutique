import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Menu,
  Close,
  PersonAdd,
} from '@mui/icons-material';
import UserDashboard from '../User/UserDashboard'; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useSelector(state => state.cart);
  
  const navigate = useNavigate();
  
  // 1. Get state from Redux
  const { isAuthenticated: reduxAuth, user: reduxUser } = useSelector((state) => state.user);

  // 2. Fallback Logic: Check Local Storage immediately to prevent icon disappearing on refresh
  const localAuth = localStorage.getItem('isAuthenticated') === 'true';
  const localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // 3. Final Constants: Prioritize Redux, but fallback to LocalStorage
  const isAuthenticated = reduxAuth || localAuth;
  const user = reduxUser || localUser;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
    setSearchQuery('');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-[#6D1A36] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* 1. Logo */}
        <Link to="/" className="text-2xl font-bold tracking-[0.2em] text-[#D4AF37] hover:opacity-80 transition">
          BRAND
        </Link>

        {/* 2. Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Shop' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="hover:text-[#D4AF37] transition-colors duration-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 3. Action Icons & Search */}
        <div className="flex items-center gap-5">
          
          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-[#111] border border-gray-800 rounded-full px-3 py-1 focus-within:border-[#D4AF37] transition-all"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm focus:outline-none w-32 focus:w-48 transition-all duration-300 px-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-[#D4AF37]">
              <Search fontSize="small" />
            </button>
          </form>

          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="group-hover:text-[#D4AF37] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#6D1A36] text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-[#D4AF37] font-bold">
              {cartItems.length}
            </span>
          </Link>

          {/* User Profile Logic - Using the combined local+redux variables */}
          <div className="flex items-center border-l border-gray-800 pl-4 ml-2">
            {isAuthenticated ? (
              <UserDashboard user={user} />
            ) : (
              <Link to="/login" className="flex items-center gap-2 hover:text-[#D4AF37] transition">
                <PersonAdd fontSize="medium" />
                <span className="hidden sm:inline text-[10px] uppercase tracking-tighter">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#D4AF37]"
          >
            {isMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#6D1A36] animate-fadeIn">
          <ul className="flex flex-col p-6 gap-6 text-sm uppercase tracking-widest">
            <li onClick={() => setIsMenuOpen(false)}><Link to="/">Home</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/products">Shop</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/about">About</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/contact">Contact</Link></li>
            <form onSubmit={handleSearch} className="flex border border-[#D4AF37] rounded overflow-hidden">
              <input
                type="text"
                className="bg-black flex-1 p-2 outline-none"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-[#D4AF37] px-4 text-black"><Search /></button>
            </form>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
