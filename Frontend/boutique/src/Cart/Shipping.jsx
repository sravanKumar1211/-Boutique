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
    const [city, setCity] = useState(shippingInfo.city || "");
    const [state, setState] = useState(shippingInfo.state || "");
    const [pincode, setPincode] = useState(shippingInfo.pinCode || "");
    const [phone, setPhone] = useState(shippingInfo.phone || "");
    const [country, setCountry] = useState(shippingInfo.country || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, pinCode: pincode, phone, country }));
        navigate("/order/confirm");
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 font-sans">
            <PageTitle title='Shipping Details' />
            <Navbar />
            
            <div className="max-w-[1150px] mx-auto px-4 pb-20">
                <CheckoutPath activePath={0} />

                <div className="max-w-xl mx-auto">
                    <h1 className="text-2xl font-semibold mb-6 text-[#5A0E24]">Enter a shipping address</h1>
                    
                    <div className="bg-white p-8 rounded-md border border-gray-300 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            {/* Country Selector style */}
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-700">Country/Region</label>
                                <input 
                                    required
                                    type="text" 
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full bg-[#f0f2f2] border border-gray-400 p-2 rounded-md shadow-inner text-sm focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8]"
                                    placeholder="India" 
                                />
                            </div>

                            {/* Street Address */}
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-700">Street Address</label>
                                <input 
                                    required
                                    type="text" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-white border border-gray-400 p-2 rounded-md text-sm focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8]"
                                    placeholder="Flat, House no., Building, Company, Apartment" 
                                />
                            </div>

                            {/* City and State Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">City</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full bg-white border border-gray-400 p-2 rounded-md text-sm focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">State</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="w-full bg-white border border-gray-400 p-2 rounded-md text-sm focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8]"
                                    />
                                </div>
                            </div>

                            {/* Pincode and Phone Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">Pincode</label>
                                    <input 
                                        required
                                        type="number" 
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="w-full bg-white border border-gray-400 p-2 rounded-md text-sm focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8]"
                                        placeholder="6 digits [0-9]" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                    <input 
                                        required
                                        type="number" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white border border-gray-400 p-2 rounded-md text-sm focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8]"
                                        placeholder="10-digit mobile number" 
                                    />
                                    <p className="text-[11px] text-gray-500 mt-0.5">May be used to assist delivery</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full md:w-auto md:px-10 bg-[#BF124D] hover:bg-[#76153C] text-white font-medium py-2 rounded-lg transition-all shadow-sm text-sm"
                                >
                                    Use this address
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 p-4 bg-white border border-gray-200 rounded-md">
                        <p className="text-xs text-gray-600">
                            Your address is kept secure and used only for fulfillment. Read our <span className="text-[#67B2D8] hover:underline cursor-pointer">Privacy Policy</span> for more info.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Shipping;