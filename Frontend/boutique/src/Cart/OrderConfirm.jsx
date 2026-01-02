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
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 pb-20">
            <PageTitle title='Confirm Order' />
            <Navbar />
            
            <div className="max-w-[1150px] mx-auto px-4">
                <CheckoutPath activePath={1} />

                <h1 className="text-2xl font-medium mb-6 text-[#5A0E24]">Review your order</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left: Shipping and Items Details */}
                    <div className="lg:col-span-2 space-y-4">
                        
                        {/* Shipping Info Section - Amazon Card Style */}
                        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h2 className="text-sm font-bold text-[#5A0E24] mb-2 uppercase tracking-tight">Shipping Address</h2>
                                <div className="text-[13px] leading-relaxed">
                                    <p className="font-semibold">{user?.name}</p>
                                    <p>{shippingInfo?.address}</p>
                                    <p>{shippingInfo?.country} - {shippingInfo?.pincode}</p>
                                    <p className="text-[#67B2D8] hover:underline cursor-pointer">Change</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-[#5A0E24] mb-2 uppercase tracking-tight">Payment Method</h2>
                                <div className="text-[13px] leading-relaxed">
                                    <p>Credit/Debit Card</p>
                                    <p className="text-[#67B2D8] hover:underline cursor-pointer">Change</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-[#5A0E24] mb-2 uppercase tracking-tight">Promotional Code</h2>
                                <p className="text-[13px] text-gray-500 italic">Enter code at payment step</p>
                            </div>
                        </div>

                        {/* Shipment Preview Card */}
                        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-[#5A0E24] mb-4">
                                <span className="text-green-700">Arriving tomorrow</span>
                                <span className="text-sm text-gray-500 font-normal ml-2">If you order in the next 2 hours</span>
                            </h2>
                            
                            <div className="space-y-6">
                                {cartItems && cartItems.map((item) => (
                                    <div key={item.product} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0">
                                        <img src={item.image} alt="Product" className="w-20 h-20 object-contain" />
                                        <div className="flex-grow">
                                            <p className="text-sm font-bold text-[#5A0E24]">{item.name}</p>
                                            <p className="text-xs text-[#BF124D] font-bold mt-1">₹{item.price}</p>
                                            <p className="text-xs text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                            <p className="text-[10px] text-gray-400 mt-2 uppercase">Sold by: YourBrand Luxury</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-5 rounded-md border border-gray-300 sticky top-4 h-fit">
                            <button 
                                onClick={proceedToPayment}
                                className="w-full bg-[#BF124D] text-white font-medium py-2 rounded-lg hover:bg-[#76153C] transition shadow-sm mb-4 text-sm"
                            >
                                Use this payment method
                            </button>
                            
                            <p className="text-[11px] text-gray-500 text-center mb-4 leading-tight">
                                By placing your order, you agree to our <span className="text-[#67B2D8]">privacy notice</span> and <span className="text-[#67B2D8]">conditions of use</span>.
                            </p>

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-bold mb-3">Order Summary</h3>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span>Items:</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping & handling:</span>
                                        <span>₹{shippingCharges.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total before tax:</span>
                                        <span>₹{(subtotal + shippingCharges).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100">
                                        <span>Estimated tax (GST 18%):</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-[#BF124D] pt-2">
                                        <span>Order Total:</span>
                                        <span>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 bg-[#f0f2f2] p-3 rounded-sm border-t border-gray-200">
                                <p className="text-[#67B2D8] text-[11px] font-bold hover:underline cursor-pointer">
                                    How are shipping costs calculated?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OrderConfirm;