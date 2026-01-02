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
  LinkedIn,
  ChevronRight
} from '@mui/icons-material';

function Dashboard() {
  // Demo data - color logic updated to your palette
  const stats = [
    { title: "Total Products", value: "130", icon: <Inventory />, color: "text-[#BF124D]" },
    { title: "Total Orders", value: "12", icon: <ShoppingCart />, color: "text-[#76153C]" },
    { title: "Total Reviews", value: "40", icon: <RateReview />, color: "text-[#67B2D8]" },
    { title: "Total Revenue", value: "₹2,11,263", icon: <AttachMoney />, color: "text-[#5A0E24]" },
    { title: "Out of Stock", value: "4", icon: <ProductionQuantityLimits />, color: "text-red-600" },
    { title: "In Stock", value: "120", icon: <Inventory />, color: "text-green-600" },
  ];

  return (
    <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
      <Navbar />
      <PageTitle title="Admin Dashboard | Vendor Central" />

      <div className="flex flex-col md:flex-row flex-grow">
        
        {/* Side NavBar - Amazon Seller Central Style */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-300 shadow-sm z-10">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <DashboardIcon className="text-[#5A0E24]" />
            <h2 className="text-lg font-bold text-[#5A0E24] tracking-tight">Vendor Central</h2>
          </div>

          <nav className="p-4 space-y-2">
            <div className="py-2">
              <h3 className="text-[11px] font-bold uppercase text-gray-400 px-3 mb-2 tracking-wider">Inventory</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/admin/products" className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-[#f0f2f2] hover:text-[#BF124D] rounded-md transition-all group">
                    <span className="flex items-center gap-3"><Inventory fontSize="small" /> Manage Inventory</span>
                    <ChevronRight fontSize="inherit" className="opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link to="/admin/product/create" className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-[#f0f2f2] hover:text-[#BF124D] rounded-md transition-all group">
                    <span className="flex items-center gap-3"><DashboardIcon fontSize="small" /> Add a Product</span>
                    <ChevronRight fontSize="inherit" className="opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="py-2 border-t border-gray-100 mt-2">
              <h3 className="text-[11px] font-bold uppercase text-gray-400 px-3 mb-2 tracking-wider">Reports</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-[#f0f2f2] rounded-md transition-all">
                    <People fontSize="small" /> Customer List
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-[#f0f2f2] rounded-md transition-all">
                    <ShoppingCart fontSize="small" /> Manage Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/reviews" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-[#f0f2f2] rounded-md transition-all">
                    <RateReview fontSize="small" /> Customer Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8">
          <header className="mb-8 flex justify-between items-center bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Dashboard <span className="text-gray-400 font-light mx-2">|</span> 
                <span className="text-[#BF124D]">Luxury Sales Overview</span>
              </h1>
              <p className="text-gray-500 text-xs mt-1">Marketplace summary for the last 30 days</p>
            </div>
            <div className="hidden lg:block text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                <p className="text-sm text-green-600 font-bold flex items-center gap-1">● Account Healthy</p>
            </div>
          </header>

          {/* Stats Grid - Amazon Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">{stat.title}</p>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
                    <span className="text-[10px] text-green-600 font-bold">↑ 2.4%</span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50">
                    <button className="text-[11px] font-bold text-[#67B2D8] hover:underline uppercase">View Report</button>
                </div>
              </div>
            ))}
          </div>

          {/* Presence & Socials Section */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Social Presence</h3>
            </div>
            <div className="p-6 flex flex-wrap gap-10">
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#BF124D] transition-colors text-sm font-medium">
                <Instagram fontSize="small" /> <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#BF124D] transition-colors text-sm font-medium">
                <Facebook fontSize="small" /> <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#BF124D] transition-colors text-sm font-medium">
                <Twitter fontSize="small" /> <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#BF124D] transition-colors text-sm font-medium">
                <LinkedIn fontSize="small" /> <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </main>

      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;