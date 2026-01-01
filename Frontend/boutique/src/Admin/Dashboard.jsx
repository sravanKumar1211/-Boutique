import React from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  Inventory, 
  Dashboard as DashboardIcon, 
  ShoppingCart, 
  People, 
  RateReview, 
  AttachMoney, 
  ProductionQuantityLimits,
  Instagram,
  Facebook,
  Twitter,
  LinkedIn
} from '@mui/icons-material';

function Dashboard() {
  // Demo data - later you can fetch this from Redux/Backend
  const stats = [
    { title: "Total Products", value: "130", icon: <Inventory />, color: "text-blue-500" },
    { title: "Total Orders", value: "12", icon: <ShoppingCart />, color: "text-green-500" },
    { title: "Total Reviews", value: "40", icon: <RateReview />, color: "text-purple-500" },
    { title: "Total Revenue", value: "₹2,11,263", icon: <AttachMoney />, color: "text-[#D4AF37]" },
    { title: "Out of Stock", value: "4", icon: <ProductionQuantityLimits />, color: "text-red-500" },
    { title: "In Stock", value: "120", icon: <Inventory />, color: "text-emerald-500" },
  ];

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <PageTitle title="Admin Dashboard | Luxury Collection" />

      <div className="flex flex-col md:flex-row flex-grow">
        
        {/* Side NavBar */}
        <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-gray-900 p-6 space-y-8">
          <div className="flex items-center gap-3 mb-10">
            <DashboardIcon className="text-[#D4AF37]" />
            <h2 className="text-xl font-light tracking-widest uppercase">Admin</h2>
          </div>

          <nav className="space-y-6">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Inventory</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/admin/products" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <Inventory fontSize="small" /> All Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/product/create" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <DashboardIcon fontSize="small" /> Create Product
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Management</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/admin/users" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <People fontSize="small" /> All Users
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <ShoppingCart fontSize="small" /> All Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/reviews" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#D4AF37] transition-colors">
                    <RateReview fontSize="small" /> All Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          <header className="mb-10">
            <h1 className="text-3xl font-light uppercase tracking-widest">
              Store <span className="text-[#D4AF37]">Overview</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">Welcome back to your luxury management suite.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#0a0a0a] border border-gray-900 p-6 rounded-sm hover:border-[#D4AF37]/50 transition-all shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`${stat.color} opacity-80`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Socials Section */}
          <div className="bg-[#0a0a0a] border border-gray-900 p-8 rounded-sm">
            <h3 className="text-sm uppercase tracking-widest mb-6 border-b border-gray-900 pb-4">Presence & Socials</h3>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><LinkedIn /></a>
            </div>
          </div>
        </main>

      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;