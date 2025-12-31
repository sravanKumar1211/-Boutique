import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutPath from './CheckoutPath';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CreditCard, VerifiedUser, ArrowBack, Security } from '@mui/icons-material';

function Payment() {
    // 1. Get Data from Storage and State
    const orderItem = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);
    const navigate =useNavigate();

    const completePayment = async (amount) => {
        try {
            // 2. Fetch Razorpay Key from Backend
            const { data: keyData } = await axios.get('/api/v1/getkey');
            const { key } = keyData;

            // 3. Create Order in Backend
            const { data: orderData } = await axios.post('/api/v1/payment/process', { amount });
            const { order } = orderData;

            // 4. Razorpay Configuration Options
            const options = {
                key: key,
                amount: order.amount,
                currency: 'INR',
                name: 'BRAND STORE',
                description: 'Premium Luxury Wear',
                order_id: order.id,
                // Change this to your production URL when deploying
                handler:async function(response){
                  const {data}=await axios.post('/api/v1/paymentVerification',{
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_order_id:response.razorpay_order_id,
                    razorpay_signature:response.razorpay_signature
                  })
                  if(data.success){
                    navigate(`/paymentSuccess?reference=${data.reference}`)
                  }else{
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
                    color: '#6D1A36' // Wine/Maroon theme
                },
            };

            // 5. Open Razorpay Modal
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Initiation Failed:", error);
            alert("Could not initiate payment. Please try again.");
        }
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <PageTitle title='Secure Payment' />
            <Navbar />
            
            <div className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
                <CheckoutPath activePath={2} />

                <div className="mt-8 flex items-center justify-between border-b border-gray-800 pb-4">
                    <Link to='/order/confirm' className="text-gray-400 hover:text-[#D4AF37] flex items-center gap-2 text-xs uppercase tracking-widest transition">
                        <ArrowBack fontSize="small" /> Back to Summary
                    </Link>
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                        <VerifiedUser fontSize="small" />
                        <span className="text-[10px] uppercase tracking-widest font-semibold">256-bit SSL Secure</span>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Payment Summary Panel */}
                    <div className="bg-[#0a0a0a] p-8 border border-gray-900 rounded-sm">
                        <h3 className="text-sm uppercase tracking-[0.2em] mb-6 text-[#D4AF37] font-bold">Order Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span className="font-light">Items Total</span>
                                <span>₹{orderItem?.subtotal?.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span className="font-light">Shipping</span>
                                <span>₹{orderItem?.shippingCharges?.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span className="font-light">GST (18%)</span>
                                <span>₹{orderItem?.taxPrice?.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="h-[1px] bg-gray-800 my-4"></div>
                            <div className="flex justify-between font-bold text-lg text-white tracking-wider">
                                <span>TOTAL DUE</span>
                                <span className="text-[#D4AF37]">₹{orderItem?.totalPrice?.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Panel */}
                    <div className="flex flex-col justify-center items-center p-8 border border-[#6D1A36] bg-[#6D1A36]/5 rounded-sm relative overflow-hidden">
                        {/* Background subtle icon decoration */}
                        <Security className="absolute -bottom-4 -right-4 text-white/5 scale-[3]" />
                        
                        <CreditCard sx={{ fontSize: 60, color: '#D4AF37', mb: 3 }} />
                        <h2 className="text-xl font-light mb-2 tracking-tight">Ready to Pay?</h2>
                        <p className="text-gray-500 text-[10px] text-center mb-8 uppercase tracking-[0.2em] leading-relaxed">
                            A secure popup will open to complete <br/> your transaction via Razorpay.
                        </p>
                        
                        <button 
                            onClick={() => completePayment(orderItem?.totalPrice)}
                            className="w-full bg-[#D4AF37] text-black font-bold py-4 uppercase tracking-[0.3em] text-xs hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.1)] active:scale-95 z-10"
                        >
                            Complete Order ₹{orderItem?.totalPrice}
                        </button>
                        
                        <div className="mt-8 flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="text-[9px] border border-gray-700 px-2 py-1 rounded-sm">UPI</div>
                            <div className="text-[9px] border border-gray-700 px-2 py-1 rounded-sm">CARDS</div>
                            <div className="text-[9px] border border-gray-700 px-2 py-1 rounded-sm">NETBANKING</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Payment;