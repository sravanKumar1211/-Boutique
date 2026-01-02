import React, { useState } from 'react';
import logo from '../images/logo.png';
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
  
  const { isAuthenticated: reduxAuth, user: reduxUser } = useSelector((state) => state.user);

  const localAuth = localStorage.getItem('isAuthenticated') === 'true';
  const localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

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
    <nav className="bg-[#5A0E24] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide px-2 py-1 rounded hover:ring-1 hover:ring-[#67B2D8]"
        >
          <img src={logo} alt="Sravan" className='h-16 rounded-4xl'/>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase">
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Shop' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="px-2 py-1 rounded hover:ring-1 hover:ring-[#67B2D8]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-white rounded overflow-hidden h-10 w-[420px]"
          >
            <input
              type="text"
              placeholder="Search products"
              className="flex-1 h-full px-3 text-sm text-black outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-[#67B2D8] h-full px-4 flex items-center justify-center">
              <Search className="text-black" />
            </button>
          </form>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center px-2 py-1 rounded hover:ring-1 hover:ring-[#67B2D8]"
          >
            <ShoppingCart />
            <span className="absolute -top-1 -right-1 bg-[#BF124D] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </Link>

          {/* User */}
          <div className="hidden sm:flex items-center px-2 py-1 rounded hover:ring-1 hover:ring-[#67B2D8]">
            {isAuthenticated ? (
              <UserDashboard user={user} />
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-xs">
                <PersonAdd />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden px-2 py-1 rounded hover:ring-1 hover:ring-[#67B2D8]"
          >
            {isMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#76153C] border-t border-[#BF124D]">
          <ul className="flex flex-col gap-4 p-4 text-sm uppercase">
            <li onClick={() => setIsMenuOpen(false)}><Link to="/">Home</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/products">Shop</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/about">About</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/contact">Contact</Link></li>

            <form onSubmit={handleSearch} className="flex bg-white rounded overflow-hidden h-10">
              <input
                type="text"
                className="flex-1 px-3 text-black outline-none"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-[#67B2D8] px-4">
                <Search className="text-black" />
              </button>
            </form>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
