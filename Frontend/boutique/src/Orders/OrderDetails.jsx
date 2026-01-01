import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, clearErrors } from '../features/order/orderSlice';
import { toast } from 'react-toastify';
import { LocalShipping, Receipt, Inventory, Payment } from '@mui/icons-material';

function OrderDetails() {
    // 1. Get the ID from the URL (Ensure it matches :id in App.js)
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // 2. Select order state
    const { order, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        // 3. Only fetch if ID is present to avoid "Invalid resource" error
        if (id) {
            dispatch(getOrderDetails(id));
        }

        // 4. Error handling
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, id, error]);

    // 5. Formatting Helper
    const shippingDetails = order?.shippingInfo 
        ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}` 
        : "Loading address...";

    return (
        <div className="bg-black min-h-screen text-white font-light">
            <PageTitle title="Order Details" />
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-900 pb-8">
                    <div>
                        <h1 className="text-3xl tracking-[0.2em] uppercase mb-2">
                            Order <span className="text-[#D4AF37]">Details</span>
                        </h1>
                        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                            {loading ? "Fetching..." : `ID: #${order?._id}`}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        {!loading && order?.orderStatus && (
                            <span className={`px-6 py-2 border ${order.orderStatus === 'Delivered' ? 'border-green-900 text-green-500' : 'border-[#6D1A36] text-[#D4AF37]'} uppercase text-[10px] tracking-[0.3em] font-bold`}>
                                {order.orderStatus}
                            </span>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mb-4"></div>
                        <p className="text-xs uppercase tracking-[0.5em] text-gray-500">Authenticating Order</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">
                        
                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-2 space-y-10">
                            
                            {/* Items Table */}
                            <section className="bg-[#0a0a0a] border border-gray-900 p-8 rounded-sm">
                                <div className="flex items-center gap-3 mb-8 text-[#D4AF37]">
                                    <Inventory fontSize="small" />
                                    <h2 className="uppercase tracking-widest text-sm font-bold">Items Purchased</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="border-b border-gray-900">
                                            <tr className="text-[10px] uppercase tracking-widest text-gray-500">
                                                <th className="pb-4 font-medium">Product</th>
                                                <th className="pb-4 font-medium">Qty</th>
                                                <th className="pb-4 font-medium text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-900">
                                            {order?.orderItems?.map((item) => (
                                                <tr key={item.product} className="group">
                                                    <td className="py-6 flex items-center gap-4">
                                                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border border-gray-800 group-hover:border-[#D4AF37] transition-colors" />
                                                        <span className="text-sm uppercase tracking-wider">{item.name}</span>
                                                    </td>
                                                    <td className="py-6 text-sm text-gray-400">{item.quantity}</td>
                                                    <td className="py-6 text-sm text-right font-mono tracking-tighter">₹{item.price?.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Shipping section */}
                            <section className="bg-[#0a0a0a] border border-gray-900 p-8 rounded-sm">
                                <div className="flex items-center gap-3 mb-6 text-[#D4AF37]">
                                    <LocalShipping fontSize="small" />
                                    <h2 className="uppercase tracking-widest text-sm font-bold">Delivery Info</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                    <div>
                                        <p className="text-gray-500 uppercase text-[10px] tracking-widest mb-2 font-bold">Destination</p>
                                        <p className="leading-relaxed text-gray-300 italic">{shippingDetails}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 uppercase text-[10px] tracking-widest mb-2 font-bold">Recipient Phone</p>
                                        <p className="text-gray-300 font-mono tracking-widest">{order?.shippingInfo?.phoneNo}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-10">
                            {/* Payment Status */}
                            <section className="bg-[#0a0a0a] border border-gray-900 p-8 rounded-sm">
                                <div className="flex items-center gap-3 mb-6 text-[#D4AF37]">
                                    <Payment fontSize="small" />
                                    <h2 className="uppercase tracking-widest text-sm font-bold">Payment Transaction</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-900 pb-4">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Status</span>
                                        <span className={`text-xs font-black uppercase tracking-widest ${order?.paymentInfo?.status === "succeeded" ? "text-green-500" : "text-red-500"}`}>
                                            {order?.paymentInfo?.status === "succeeded" ? "Paid" : "Pending"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Date</span>
                                        <span className="text-gray-300 text-xs font-mono">
                                            {order?.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Final Invoice Summary */}
                            <section className="bg-[#D4AF37] p-[1px] rounded-sm">
                                <div className="bg-black p-8">
                                    <div className="flex items-center gap-3 mb-8 text-[#D4AF37]">
                                        <Receipt fontSize="small" />
                                        <h2 className="uppercase tracking-widest text-sm font-bold">Invoice Summary</h2>
                                    </div>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between text-gray-400">
                                            <span>Base Amount</span>
                                            <span className="font-mono">₹{order?.itemsPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                            <span>Logistic Charges</span>
                                            <span className="font-mono">₹{order?.shippingPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400 border-b border-gray-900 pb-4">
                                            <span>GST/Tax</span>
                                            <span className="font-mono">₹{order?.taxPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-2 flex justify-between text-white font-bold">
                                            <span className="uppercase tracking-[0.2em] text-xs">Grand Total</span>
                                            <span className="text-[#D4AF37] font-mono text-xl">₹{order?.totalPrice?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default OrderDetails;