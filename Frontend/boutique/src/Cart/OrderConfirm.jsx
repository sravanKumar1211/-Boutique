import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import CheckoutPath from './CheckoutPath';
import { useNavigate } from 'react-router-dom';

function OrderConfirm() {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    // Calculate Prices
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 50;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.country} - ${shippingInfo.pincode}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        // Storing in sessionStorage for the final payment step
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    };

    return (
        <div className="bg-black min-h-screen text-white pb-20">
            <PageTitle title='Confirm Order' />
            <Navbar />
            <div className="max-w-7xl mx-auto px-4">
                <CheckoutPath activePath={1} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                    
                    {/* Left: Shipping and Items Details */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* Shipping Info Section */}
                        <div className="bg-[#111] p-6 rounded-lg border border-gray-900 shadow-xl">
                            <h2 className="text-[#D4AF37] text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-[#6D1A36] pl-3">
                                Shipping Information
                            </h2>
                            <div className="space-y-3 text-sm tracking-wide">
                                <div className="flex gap-4"><span className="text-gray-500 w-20">Name:</span> <span>{user?.name}</span></div>
                                <div className="flex gap-4"><span className="text-gray-500 w-20">Phone:</span> <span>{shippingInfo?.phone}</span></div>
                                <div className="flex gap-4"><span className="text-gray-500 w-20">Address:</span> <span className="text-gray-300">{address}</span></div>
                            </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="bg-[#111] p-6 rounded-lg border border-gray-900">
                            <h2 className="text-[#D4AF37] text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-[#6D1A36] pl-3">
                                Your Shipment
                            </h2>
                            <div className="space-y-4">
                                {cartItems && cartItems.map((item) => (
                                    <div key={item.product} className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt="Product" className="w-16 h-16 object-contain bg-black rounded p-1" />
                                            <div>
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.quantity} x ₹{item.price}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-[#D4AF37]">₹{item.quantity * item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#111] p-8 rounded-lg border border-[#6D1A36] sticky top-24 shadow-2xl">
                            <h3 className="text-xl font-bold text-[#D4AF37] mb-8 uppercase tracking-widest text-center">Order Summary</h3>
                            
                            <div className="space-y-5 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal:</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping:</span>
                                    <span>₹{shippingCharges.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-4">
                                    <span>GST (18%):</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-[#D4AF37] pt-2">
                                    <span>Total:</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={proceedToPayment}
                                className="w-full mt-10 bg-[#D4AF37] text-black font-black py-4 rounded hover:bg-white transition duration-500 uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/10"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OrderConfirm;