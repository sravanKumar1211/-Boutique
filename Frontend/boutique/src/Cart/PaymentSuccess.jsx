import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircleOutline, ShoppingBag, ReceiptLong } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder, clearErrors } from '../features/order/orderSlice'; 
import { clearCart } from '../features/cart/cartSlice';

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');
    const dispatch = useDispatch();
    
    // Ref to prevent double execution in React.StrictMode
    const hasExecuted = useRef(false);

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error, success } = useSelector(state => state.order || {});

    useEffect(() => {
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
        if(!orderInfo){
            return ;
        }

        // Only run if we have a reference and haven't already created the order
        if (reference && !hasExecuted.current && orderInfo) {
            const orderData = {
                shippingInfo: {
                    address: shippingInfo.address,
                    city: shippingInfo.city,
                    state: shippingInfo.state,
                    country: shippingInfo.country,
                    pinCode: shippingInfo.pinCode,
                    phoneNo: shippingInfo.phoneNo || shippingInfo.phone,
                },
                orderItems: cartItems.map((item) => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    product: item.product, 
                })),
                paymentInfo: {
                    id: reference,
                    status: 'succeeded',
                },
                itemsPrice: orderInfo.subtotal,
                taxPrice: orderInfo.taxPrice,
                shippingPrice: orderInfo.shippingCharges,
                totalPrice: orderInfo.totalPrice,
            };

            dispatch(createOrder(orderData));
            hasExecuted.current = true;
            
            // Clean up session storage after dispatching
            sessionStorage.removeItem('orderInfo');
        }

         if (success) {
            toast.success('order placed');
            dispatch(clearCart)
            dispatch(clearErrors());
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, reference, cartItems, shippingInfo, error,success]);

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <PageTitle title="Payment Successful" />
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full bg-[#0a0a0a] border border-[#6D1A36] p-10 rounded-sm text-center shadow-[0_0_50px_rgba(109,26,54,0.15)]">
                    
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <CheckCircleOutline sx={{ fontSize: 80, color: '#D4AF37' }} />
                            <div className="absolute inset-0 animate-ping rounded-full bg-[#D4AF37]/10"></div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-light tracking-[0.2em] mb-4 uppercase">
                        Order <span className="text-[#D4AF37]">Confirmed</span>
                    </h1>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Thank you for your purchase. Your payment was successful and your luxury pieces are now being prepared for delivery.
                    </p>

                    <div className="bg-black border border-gray-900 py-4 px-4 mb-10">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">
                            Transaction Reference
                        </span>
                        <span className="text-[#D4AF37] font-mono text-xs break-all tracking-wider">
                            {reference || "PROCESSED"}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link 
                            to="/orders/user" 
                            className="bg-[#D4AF37] text-black font-bold py-4 uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2"
                        >
                            <ReceiptLong fontSize="small" /> View My Orders
                        </Link>

                        <Link 
                            to="/products" 
                            className="border border-gray-800 text-gray-400 font-bold py-4 uppercase tracking-[0.2em] text-[10px] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-2"
                        >
                            <ShoppingBag fontSize="small" /> Return to Shop
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PaymentSuccess;