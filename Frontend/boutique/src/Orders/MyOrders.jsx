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
    const hasFetched = useRef(false);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (!hasFetched.current) {
            dispatch(getAllMyOrders());
            hasFetched.current = true;
        }
    }, [dispatch, error]);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <PageTitle title="My Orders | Luxury Collection" />

            <div className="flex-grow max-w-6xl mx-auto w-full px-4 py-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBagOutlined className="text-[#76153C]" fontSize="large" />
                    <h1 className="text-2xl font-semibold tracking-wide text-black">
                        Your <span className="text-[#BF124D]">Orders</span>
                    </h1>
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#76153C] border-t-[#67B2D8]"></div>
                    </div>
                ) : orders && orders.length > 0 ? (

                    /* Orders Table */
                    <div className="overflow-x-auto border border-[#76153C]/25 rounded-md">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-[#5A0E24]/5 border-b border-[#76153C]/20">
                                    <th className="p-4 text-[11px] uppercase tracking-wider text-gray-600">Order ID</th>
                                    <th className="p-4 text-[11px] uppercase tracking-wider text-gray-600">Status</th>
                                    <th className="p-4 text-[11px] uppercase tracking-wider text-gray-600">Items</th>
                                    <th className="p-4 text-[11px] uppercase tracking-wider text-gray-600">Total</th>
                                    <th className="p-4 text-[11px] uppercase tracking-wider text-gray-600 text-right">Details</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#76153C]/15">
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="hover:bg-[#5A0E24]/5 transition"
                                    >
                                        <td className="p-4 text-xs font-mono text-gray-700">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wide
                                                ${
                                                    order.orderStatus === 'Delivered'
                                                        ? 'bg-[#67B2D8]/15 text-[#67B2D8] border border-[#67B2D8]/30'
                                                        : 'bg-[#BF124D]/10 text-[#BF124D] border border-[#BF124D]/30'
                                                }`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </td>

                                        <td className="p-4 text-sm text-gray-700">
                                            {order.orderItems.length} item{order.orderItems.length > 1 && 's'}
                                        </td>

                                        <td className="p-4 text-sm font-semibold text-[#BF124D]">
                                            ₹{order.totalPrice.toLocaleString()}
                                        </td>

                                        <td className="p-4 text-right">
                                            <Link
                                                to={`/order/${order._id}`}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-[#67B2D8]/15 transition"
                                            >
                                                <LaunchOutlined sx={{ fontSize: 18 }} className="text-[#67B2D8]" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                ) : (
                    /* Empty Orders */
                    <div className="text-center py-24 border border-dashed border-[#76153C]/30 rounded-md">
                        <p className="text-gray-500 mb-6 uppercase tracking-widest text-xs">
                            No orders placed yet
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-[#67B2D8] text-black px-8 py-3 text-xs font-bold uppercase tracking-widest
                                       hover:bg-[#BF124D] hover:text-white transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default MyOrders;
