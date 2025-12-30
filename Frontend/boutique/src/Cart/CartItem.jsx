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
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 border border-gray-800 p-4 rounded-lg hover:border-[#6D1A36] transition group">
            
            {/* Image and Info */}
            <div className="flex items-center gap-4 w-full sm:w-1/2">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-contain bg-black rounded p-1 border border-gray-800 group-hover:border-[#D4AF37] transition" 
                />
                <div className="overflow-hidden">
                    <h3 className="text-white font-medium truncate text-sm">{item.name}</h3>
                    <p className="text-[#D4AF37] font-bold text-xs mt-1">₹{item.price}</p>
                </div>
            </div>

            {/* Controls and Total */}
            <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-8">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-700 rounded overflow-hidden h-8">
                    <button 
                        onClick={() => updateQty(item.quantity - 1)}
                        className="px-3 bg-gray-800 hover:bg-[#6D1A36] transition"
                    > - </button>
                    <span className="w-8 text-center bg-black text-xs font-mono">{item.quantity}</span>
                    <button 
                        onClick={() => updateQty(item.quantity + 1)}
                        className="px-3 bg-gray-800 hover:bg-[#6D1A36] transition"
                    > + </button>
                </div>

                {/* Sub-total */}
                <div className="text-right min-w-[80px]">
                    <span className="text-white font-bold text-sm">₹{item.price * item.quantity}</span>
                </div>

                {/* Remove */}
                <button 
                    onClick={() => dispatch(removeItemsFromCart(item.product))}
                    className="text-red-500 hover:text-red-400 p-1"
                    title="Remove Item"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CartItem;