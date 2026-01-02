import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../features/cart/cartSlice';

function CartItem({ item }) {
    const dispatch = useDispatch();

    const updateQty = (newQty) => {
        if (newQty < 1 || newQty > item.stock) return;
        dispatch(addItemsToCart({ id: item.product, quantity: newQty }));
    };

    return (
        <div className="flex flex-col md:flex-row py-4 gap-4 bg-white">
            
            {/* 1. Image Section */}
            <div className="flex-shrink-0 w-full md:w-44 flex justify-center">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-44 h-44 object-contain" 
                />
            </div>

            {/* 2. Info & Actions Section */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="text-lg font-medium text-[#5A0E24] leading-tight hover:text-[#BF124D] cursor-pointer transition-colors">
                            {item.name}
                        </h3>
                        <p className="text-xs text-green-700 mt-1">In Stock</p>
                        <p className="text-xs text-gray-500 mt-1">Eligible for FREE Shipping</p>
                    </div>
                    
                    {/* Price on right (Desktop) */}
                    <div className="text-right hidden md:block">
                        <span className="text-lg font-bold text-[#5A0E24]">₹{item.price}</span>
                    </div>
                </div>

                {/* 3. Amazon Style Bottom Row (Qty & Links) */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                    {/* Quantity Control Box */}
                    <div className="flex items-center bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg shadow-sm h-8">
                        <button 
                            onClick={() => updateQty(item.quantity - 1)}
                            className="px-3 py-1 hover:bg-[#e7e9ec] rounded-l-lg text-lg text-gray-700"
                        > - </button>
                        <span className="px-3 text-sm font-medium border-x border-[#D5D9D9] h-full flex items-center bg-white">
                            Qty: {item.quantity}
                        </span>
                        <button 
                            onClick={() => updateQty(item.quantity + 1)}
                            className="px-3 py-1 hover:bg-[#e7e9ec] rounded-r-lg text-lg text-gray-700"
                        > + </button>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center text-xs text-[#67B2D8] divide-x divide-gray-300">
                        <button 
                            onClick={() => dispatch(removeItemsFromCart(item.product))}
                            className="pr-3 hover:underline hover:text-[#BF124D]"
                        >
                            Delete
                        </button>
                        <button className="px-3 hover:underline hover:text-[#BF124D]">
                            Save for later
                        </button>
                        <button className="px-3 hover:underline hover:text-[#BF124D] hidden sm:block">
                            Compare with similar items
                        </button>
                    </div>
                </div>
                
                {/* Mobile Price Display */}
                <div className="md:hidden mt-2">
                     <span className="text-lg font-bold text-[#5A0E24]">₹{item.price}</span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;