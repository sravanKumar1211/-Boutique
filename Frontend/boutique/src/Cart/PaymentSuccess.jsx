import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircleOutline, ShoppingBag, ReceiptLong } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <PageTitle title="Payment Successful" />
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full bg-[#0a0a0a] border border-[#6D1A36] p-10 rounded-sm text-center shadow-[0_0_50px_rgba(109,26,54,0.2)]">
                    
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <CheckCircleOutline sx={{ fontSize: 80, color: '#D4AF37' }} />
                            <div className="absolute inset-0 animate-ping rounded-full bg-[#D4AF37]/20"></div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-3xl font-light tracking-[0.2em] mb-4 uppercase">
                        Order <span className="text-[#D4AF37]">Confirmed</span>
                    </h1>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Thank you for your purchase. Your payment has been processed successfully. 
                        A confirmation email has been sent to your registered address.
                    </p>

                    {/* Reference Box */}
                    <div className="bg-black border border-gray-900 py-3 px-4 mb-10">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">
                            Reference ID
                        </span>
                        <span className="text-[#D4AF37] font-mono text-sm break-all">
                            {reference || "N/A"}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                        <Link 
                            to="/orders/user" 
                            className="bg-[#D4AF37] text-black font-bold py-3 uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 flex items-center justify-center gap-2"
                        >
                            <ReceiptLong fontSize="small" /> View My Orders
                        </Link>

                        <Link 
                            to="/products" 
                            className="border border-gray-700 text-gray-300 font-bold py-3 uppercase tracking-widest text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-2"
                        >
                            <ShoppingBag fontSize="small" /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PaymentSuccess;
