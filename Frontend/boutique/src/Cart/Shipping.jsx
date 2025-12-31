import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { saveShippingInfo } from '../features/cart/cartSlice';

function Shipping() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address || "");
    const [pincode, setPincode] = useState(shippingInfo.pincode || "");
    const [phone, setPhone] = useState(shippingInfo.phone || "");
    const [country, setCountry] = useState(shippingInfo.country || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }
        dispatch(saveShippingInfo({ address, pincode, phone, country }));
        navigate("/order/confirm");
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <PageTitle title='Shipping Details' />
            <Navbar />
            
            <div className="max-w-xl mx-auto px-6 pb-20">
                <CheckoutPath activePath={0}  />

                <div className="bg-[#111] p-8 rounded-lg border border-gray-900 shadow-2xl">
                    <h1 className="text-2xl font-bold text-[#D4AF37] uppercase tracking-widest mb-8 text-center">
                        Delivery Address
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Street Address</label>
                            <input 
                                required
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-black border border-gray-800 p-3 rounded focus:border-[#D4AF37] outline-none text-sm transition"
                                placeholder="123 Luxury Ave, Suite 4" 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Pincode</label>
                                <input 
                                    required
                                    type="number" 
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    className="w-full bg-black border border-gray-800 p-3 rounded focus:border-[#D4AF37] outline-none text-sm transition"
                                    placeholder="400001" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Phone Number</label>
                                <input 
                                    required
                                    type="number" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-black border border-gray-800 p-3 rounded focus:border-[#D4AF37] outline-none text-sm transition"
                                    placeholder="9876543210" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Country</label>
                            <input 
                                required
                                type="text" 
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-black border border-gray-800 p-3 rounded focus:border-[#D4AF37] outline-none text-sm transition"
                                placeholder="India" 
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-[#D4AF37] text-black font-black py-4 rounded mt-4 uppercase tracking-[0.3em] hover:bg-white transition duration-500"
                        >
                            Continue to Review
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Shipping;