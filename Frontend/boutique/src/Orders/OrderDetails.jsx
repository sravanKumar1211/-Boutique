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
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) dispatch(getOrderDetails(id));
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, id, error]);

    const shippingDetails = order?.shippingInfo 
        ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}` 
        : "Loading address...";

    return (
        <div className="bg-white min-h-screen text-black">
            <PageTitle title="Order Details" />
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-[#76153C]/20 pb-6">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-wide">
                            Order <span className="text-[#BF124D]">Details</span>
                        </h1>
                        <p className="text-gray-500 font-mono text-xs mt-1">
                            {loading ? "Fetching..." : `Order ID: #${order?._id}`}
                        </p>
                    </div>

                    {!loading && order?.orderStatus && (
                        <span
                            className={`mt-4 md:mt-0 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                            ${
                                order.orderStatus === 'Delivered'
                                    ? 'bg-[#67B2D8]/15 text-[#67B2D8] border border-[#67B2D8]/40'
                                    : 'bg-[#BF124D]/10 text-[#BF124D] border border-[#BF124D]/40'
                            }`}
                        >
                            {order.orderStatus}
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#76153C] border-t-[#67B2D8] mb-4"></div>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Loading Order</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Items */}
                            <section className="border border-[#76153C]/25 rounded-md p-6">
                                <div className="flex items-center gap-2 mb-6 text-[#76153C]">
                                    <Inventory fontSize="small" />
                                    <h2 className="text-sm font-semibold uppercase tracking-widest">
                                        Items Ordered
                                    </h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="border-b border-[#76153C]/20">
                                            <tr className="text-[11px] uppercase tracking-wider text-gray-500">
                                                <th className="pb-3">Product</th>
                                                <th className="pb-3">Qty</th>
                                                <th className="pb-3 text-right">Price</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-[#76153C]/15">
                                            {order?.orderItems?.map((item) => (
                                                <tr key={item.product}>
                                                    <td className="py-4 flex items-center gap-4">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-14 h-14 object-contain border border-[#76153C]/20"
                                                        />
                                                        <span className="text-sm">{item.name}</span>
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-600">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="py-4 text-sm text-right font-mono">
                                                        ₹{item.price?.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Shipping */}
                            <section className="border border-[#76153C]/25 rounded-md p-6">
                                <div className="flex items-center gap-2 mb-4 text-[#76153C]">
                                    <LocalShipping fontSize="small" />
                                    <h2 className="text-sm font-semibold uppercase tracking-widest">
                                        Delivery Info
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-1">
                                            Address
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            {shippingDetails}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-[11px] uppercase tracking-widest mb-1">
                                            Phone
                                        </p>
                                        <p className="font-mono text-gray-700">
                                            {order?.shippingInfo?.phoneNo}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-8">

                            {/* Payment */}
                            <section className="border border-[#76153C]/25 rounded-md p-6">
                                <div className="flex items-center gap-2 mb-4 text-[#76153C]">
                                    <Payment fontSize="small" />
                                    <h2 className="text-sm font-semibold uppercase tracking-widest">
                                        Payment
                                    </h2>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 uppercase tracking-widest text-[11px]">
                                            Status
                                        </span>
                                        <span
                                            className={`font-bold uppercase tracking-widest text-xs
                                            ${
                                                order?.paymentInfo?.status === "succeeded"
                                                    ? "text-[#67B2D8]"
                                                    : "text-[#BF124D]"
                                            }`}
                                        >
                                            {order?.paymentInfo?.status === "succeeded" ? "Paid" : "Pending"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500 uppercase tracking-widest text-[11px]">
                                            Date
                                        </span>
                                        <span className="font-mono text-gray-700">
                                            {order?.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Invoice */}
                            <section className="border border-[#BF124D]/40 rounded-md p-6">
                                <div className="flex items-center gap-2 mb-4 text-[#BF124D]">
                                    <Receipt fontSize="small" />
                                    <h2 className="text-sm font-semibold uppercase tracking-widest">
                                        Order Summary
                                    </h2>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Items</span>
                                        <span>₹{order?.itemsPrice?.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>₹{order?.shippingPrice?.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600 border-b border-[#76153C]/20 pb-3">
                                        <span>Tax</span>
                                        <span>₹{order?.taxPrice?.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between font-bold text-base pt-2">
                                        <span>Total</span>
                                        <span className="text-[#BF124D]">
                                            ₹{order?.totalPrice?.toLocaleString()}
                                        </span>
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
