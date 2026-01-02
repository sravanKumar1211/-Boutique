import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    
    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 50;
    const total = subtotal + tax + shipping;

    return (
        <div className="bg-[#f0f2f2] min-h-screen font-sans">
            <PageTitle title='Shopping Cart' />
            <Navbar />
            
            <div className="max-w-[1500px] mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* LEFT SECTION: CART ITEMS */}
                    <div className="flex-grow bg-white p-4 md:p-6 shadow-sm rounded-sm">
                        <h1 className="text-3xl font-medium text-[#5A0E24] mb-1">
                            Shopping Cart
                        </h1>
                        <p className="text-[#67B2D8] text-sm hover:underline cursor-pointer mb-4">
                            Deselect all items
                        </p>
                        <div className="hidden md:block text-right text-sm text-gray-600 border-b border-gray-200 pb-1">
                            Price
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="py-12 text-center">
                                <h2 className="text-xl text-gray-800 mb-4">Your Amazon Cart is empty.</h2>
                                <Link to="/products" className="text-[#67B2D8] hover:underline hover:text-[#BF124D]">
                                    Continue shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="py-4">
                                        <CartItem item={item} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {cartItems.length > 0 && (
                            <div className="text-right py-4 text-lg">
                                Subtotal ({cartItems.length} items): 
                                <span className="font-bold text-[#5A0E24] ml-1">₹{subtotal.toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SECTION: PROCEED TO CHECKOUT */}
                    {cartItems.length > 0 && (
                        <div className="lg:w-[300px] flex flex-col gap-4">
                            <div className="bg-white p-5 shadow-sm rounded-sm h-fit">
                                <div className="text-lg mb-4">
                                    <span className="text-gray-700">Subtotal ({cartItems.length} items): </span>
                                    <span className="font-bold text-[#5A0E24]">₹{total.toFixed(2)}</span>
                                    <div className="text-xs text-gray-500 mt-1">
                                        (Inc. Tax: ₹{tax.toFixed(2)} + Shipping: ₹{shipping.toFixed(2)})
                                    </div>
                                </div>
                                
                                <button 
                                    className="w-full bg-[#BF124D] hover:bg-[#76153C] text-white py-2 rounded-lg shadow-md transition-all font-medium text-sm"
                                    onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="mt-4 border border-gray-200 rounded-md p-3">
                                    <p className="text-xs text-gray-600">
                                        Select this option at checkout to see details. <span className="text-[#67B2D8] hover:underline cursor-pointer">Learn more</span>
                                    </p>
                                </div>
                            </div>

                            {/* Promotional Box (Optional/Amazon Style) */}
                            <div className="bg-white p-4 shadow-sm rounded-sm border border-gray-100">
                                <p className="text-sm font-bold text-[#5A0E24]">Your order qualifies for FREE Shipping</p>
                                <p className="text-xs text-gray-500">Choose this option at checkout. See details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;