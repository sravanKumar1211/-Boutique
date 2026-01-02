import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutPath from './CheckoutPath';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Lock, ChevronLeft, ShieldCheck } from 'lucide-react';

function Payment() {
    const orderItem = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const completePayment = async (amount) => {
        try {
            const { data: keyData } = await axios.get('/api/v1/getkey');
            const { key } = keyData;

            const { data: orderData } = await axios.post('/api/v1/payment/process', { amount });
            const { order } = orderData;

            const options = {
                key: key,
                amount: order.amount,
                currency: 'INR',
                name: 'BRAND STORE',
                description: 'Premium Luxury Wear',
                order_id: order.id,
                handler: async function(response){
                  const {data} = await axios.post('/api/v1/paymentVerification',{
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                  })
                  if(data.success){
                    navigate(`/paymentSuccess?reference=${data.reference}`)
                  } else {
                    alert('payment verification Failed')
                  }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: shippingInfo?.phone
                },
                notes: {
                    address: shippingInfo?.address
                },
                theme: {
                    color: '#BF124D' 
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Initiation Failed:", error);
            alert("Could not initiate payment. Please try again.");
        }
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
            <PageTitle title='Secure Payment - Amazon Style' />
            <Navbar />
            
            <div className="flex-grow max-w-[1150px] mx-auto w-full px-4 py-6">
                <CheckoutPath activePath={2} />

                <div className="flex flex-col lg:flex-row gap-6 mt-4">
                    
                    {/* LEFT SECTION: PAYMENT SELECTION */}
                    <div className="flex-grow space-y-4">
                        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-[#5A0E24] mb-4 flex items-center gap-2">
                                Select a payment method
                            </h2>
                            
                            <div className="border border-[#67B2D8] bg-[#67B2D8]/5 p-4 rounded-md flex items-start gap-3">
                                <input type="radio" checked readOnly className="mt-1 accent-[#BF124D]" />
                                <div className="flex-grow">
                                    <p className="font-bold text-sm text-[#5A0E24]">Razorpay Secure (UPI, Cards, NetBanking)</p>
                                    <p className="text-xs text-gray-600 mt-1">Guaranteed safe and encrypted transaction.</p>
                                    
                                    <div className="mt-4 p-4 border-t border-gray-200">
                                        <button 
                                            onClick={() => completePayment(orderItem?.totalPrice)}
                                            className="bg-[#BF124D] hover:bg-[#76153C] text-white px-8 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
                                        >
                                            Use this payment method
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-[#67B2D8] text-sm font-medium cursor-pointer hover:underline">
                                <ChevronLeft size={16} />
                                <Link to='/order/confirm'>Back to order review</Link>
                            </div>
                        </div>

                        {/* TRUST BANNER */}
                        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-sm border border-gray-200 opacity-80">
                            <ShieldCheck className="text-gray-500" />
                            <p className="text-xs text-gray-600">
                                <span className="font-bold block text-[#5A0E24]">Safe and Secure Payments</span>
                                Your information is encrypted using 256-bit SSL technology.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SECTION: ORDER SUMMARY */}
                    <div className="lg:w-[320px]">
                        <div className="bg-white p-5 rounded-sm border border-gray-300 h-fit sticky top-4">
                            <button 
                                onClick={() => completePayment(orderItem?.totalPrice)}
                                className="w-full bg-[#BF124D] hover:bg-[#76153C] text-white py-2 rounded-lg text-sm font-medium shadow-md mb-4"
                            >
                                Place your order and pay
                            </button>
                            
                            <p className="text-[11px] text-gray-500 text-center mb-4 leading-tight">
                                By placing your order, you agree to our <span className="text-[#67B2D8]">privacy notice</span>.
                            </p>

                            <div className="border-t border-gray-200 pt-3">
                                <h3 className="text-sm font-bold mb-3 text-[#5A0E24]">Order Summary</h3>
                                <div className="space-y-2 text-xs text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Items:</span>
                                        <span>₹{orderItem?.subtotal?.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-[#BF124D]">
                                        <span>Shipping:</span>
                                        <span>₹{orderItem?.shippingCharges?.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100">
                                        <span>Tax (GST 18%):</span>
                                        <span>₹{orderItem?.tax?.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-[#BF124D] pt-2">
                                        <span>Order Total:</span>
                                        <span>₹{orderItem?.totalPrice?.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-1 text-[10px] text-gray-400">
                                <Lock size={12} />
                                <span>Secure Transactions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Payment;