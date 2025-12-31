import React from 'react';
import { Truck, CheckCircle, CreditCard } from 'lucide-react';

function CheckoutPath({ activePath }) {
    const steps = [
        { label: "Shipping", icon: <Truck size={20} /> },
        { label: "Confirm Order", icon: <CheckCircle size={20} /> },
        { label: "Payment", icon: <CreditCard size={20} /> },
    ];

    return (
        <div className="flex justify-center items-center gap-4 md:gap-12 my-10 px-4">
            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group">
                    <div className={`p-3 rounded-full transition-all duration-500 border-2 
                        ${activePath >= index 
                            ? "bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                            : "bg-transparent border-gray-800 text-gray-600"}`}>
                        {step.icon}
                    </div>
                    <p className={`text-[10px] uppercase tracking-[0.2em] font-bold 
                        ${activePath >= index ? "text-[#D4AF37]" : "text-gray-600"}`}>
                        {step.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default CheckoutPath;