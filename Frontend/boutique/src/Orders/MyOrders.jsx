import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { LaunchOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyOrders, clearErrors } from '../features/order/orderSlice'; 
import { toast } from 'react-toastify';

function MyOrders() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.order);
    
    // Ref to prevent multiple API calls in Strict Mode
    const hasFetched = useRef(false);

    useEffect(() => {
        // 1. Handle Errors separately
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        // 2. Fetch data only if not already fetched
        if (!hasFetched.current) {
            dispatch(getAllMyOrders());
            hasFetched.current = true;
        }
    }, [dispatch, error]); // dependencies are safe now because of the ref guard

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar />
            <PageTitle title="My Orders | Luxury Collection" />

            <div className="flex-grow max-w-6xl mx-auto w-full px-4 py-12">
                <div className="flex items-center gap-4 mb-10">
                    <ShoppingBagOutlined className="text-[#D4AF37]" fontSize="large" />
                    <h1 className="text-3xl font-light uppercase tracking-[0.2em]">
                        Order <span className="text-[#D4AF37]">History</span>
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37]"></div>
                    </div>
                ) : orders && orders.length > 0 ? (
                    <div className="overflow-x-auto border border-gray-900 rounded-sm shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0a0a0a] border-b border-gray-800">
                                    <th className="p-5 text-[10px] uppercase tracking-widest text-gray-500">Reference ID</th>
                                    <th className="p-5 text-[10px] uppercase tracking-widest text-gray-500">Status</th>
                                    <th className="p-5 text-[10px] uppercase tracking-widest text-gray-500">Items</th>
                                    <th className="p-5 text-[10px] uppercase tracking-widest text-gray-500">Total Price</th>
                                    <th className="p-5 text-[10px] uppercase tracking-widest text-gray-500 text-right">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-900">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/[0.03] transition-colors">
                                        <td className="p-5 text-xs font-mono text-gray-400">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="p-5">
                                            <span className={`text-[9px] px-3 py-1 rounded-full font-bold tracking-widest uppercase ${
                                                order.orderStatus === 'Delivered' 
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                                : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
                                            }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-5 text-sm text-gray-300">
                                            {order.orderItems.length} {order.orderItems.length === 1 ? 'Product' : 'Products'}
                                        </td>
                                        <td className="p-5 text-sm font-bold text-[#D4AF37]">
                                            ₹{order.totalPrice.toLocaleString()}
                                        </td>
                                        <td className="p-5 text-right">
                                            <Link 
                                                to={`/order/${order._id}`} 
                                                className="text-gray-500 hover:text-white transition-all"
                                            >
                                                <LaunchOutlined sx={{ fontSize: 18 }} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-32 border border-dashed border-gray-800 rounded-sm">
                        <p className="text-gray-500 mb-8 uppercase tracking-[0.3em] text-xs">Your wardrobe is empty</p>
                        <Link to="/products" className="bg-[#D4AF37] text-black px-10 py-4 uppercase text-[10px] font-black tracking-widest hover:bg-white transition-all duration-500 shadow-lg">
                            Go To Boutique
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default MyOrders;