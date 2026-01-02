import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, ReceiptLong, CheckCircle } from '@mui/icons-material';
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
    
    const hasExecuted = useRef(false);

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error, success } = useSelector(state => state.order || {});

    useEffect(() => {
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
        if(!orderInfo){
            return ;
        }

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
            sessionStorage.removeItem('orderInfo');
        }

         if (success) {
            toast.success('order placed');
            dispatch(clearCart());
            dispatch(clearErrors());
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, reference, cartItems, shippingInfo, error, success]);

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
            <PageTitle title="Thank You - Order Confirmed" />
            <Navbar />

            <div className="flex-grow flex flex-col items-center px-4 py-10 md:py-16">
                <div className="max-w-2xl w-full bg-white border border-gray-200 p-6 md:p-10 rounded-sm shadow-sm">
                    
                    {/* Amazon Success Header */}
                    <div className="flex items-start gap-4 mb-6">
                        <CheckCircle sx={{ fontSize: 35, color: '#2e7d32' }} />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[#5A0E24] mb-1">
                                Order placed, thank you!
                            </h1>
                            <p className="text-sm text-gray-600">
                                Confirmation will be sent to your email shortly.
                            </p>
                        </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="border-t border-b border-gray-100 py-6 mb-8 flex flex-col sm:flex-row gap-8">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-tight mb-1">Shipping to:</p>
                            <p className="text-sm font-semibold">{shippingInfo?.address}</p>
                            <p className="text-sm text-gray-600">{shippingInfo?.city}, {shippingInfo?.pinCode}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-tight mb-1">Transaction ID:</p>
                            <p className="text-sm font-mono text-[#67B2D8] break-all">{reference || "PROCESSED_SUCCESSFULLY"}</p>
                        </div>
                    </div>

                    <div className="bg-[#fcf8f3] border border-[#f5ead2] p-4 rounded-md mb-8">
                        <p className="text-[13px] text-gray-700 leading-relaxed">
                            <span className="font-bold text-[#76153C]">Preparation in progress:</span> Your premium items are being inspected and packed. You can track your shipment status in your account.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link 
                            to="/orders/user" 
                            className="flex-1 bg-[#BF124D] text-white font-medium py-2 rounded-lg hover:bg-[#76153C] transition shadow-sm text-center text-sm flex items-center justify-center gap-2"
                        >
                            <ReceiptLong fontSize="small" /> Review your orders
                        </Link>

                        <Link 
                            to="/products" 
                            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition text-center text-sm flex items-center justify-center gap-2"
                        >
                            <ShoppingBag fontSize="small" /> Continue shopping
                        </Link>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100">
                        <p className="text-xs text-center text-gray-400">
                            Need help? Visit our <span className="text-[#67B2D8] hover:underline cursor-pointer">Help Section</span> or contact support.
                        </p>
                    </div>
                </div>

                {/* Tracking Promo */}
                <div className="mt-8 text-center max-w-md">
                    <p className="text-sm text-gray-500">
                        Check your <span className="text-[#67B2D8] hover:underline cursor-pointer font-medium">Order History</span> for real-time delivery updates and invoices.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PaymentSuccess;