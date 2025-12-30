import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart() {
    // Note: ensure 'cart' matches the key in your store.js
    const { cartItems } = useSelector(state => state.cart);

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 50;
    const total = subtotal + tax + shipping;

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <PageTitle title='Your Cart' />
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-8 uppercase tracking-widest border-b border-[#6D1A36] pb-2">
                    Shopping Cart
                </h2>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-6">Your bag is currently empty.</p>
                        <Link to="/products" className="bg-[#6D1A36] px-8 py-3 rounded hover:bg-[#D4AF37] hover:text-black transition">
                            View Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Items Section */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <CartItem item={item} key={item.product} />
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="bg-gray-900/50 p-6 rounded-lg border border-[#6D1A36] h-fit sticky top-24">
                            <h3 className="text-lg font-bold text-[#D4AF37] mb-6 uppercase tracking-wider">Order Summary</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax (18%)</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-4">
                                    <span>Shipping</span>
                                    <span>₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-[#D4AF37] pt-2">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full mt-8 bg-[#6D1A36] text-white font-bold py-3 rounded hover:bg-[#D4AF37] hover:text-black transition uppercase tracking-widest">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Cart;






