import React from 'react';
import { Truck, CheckCircle, CreditCard } from 'lucide-react';

function CheckoutPath({ activePath }) {
    const steps = [
        { label: "Shipping", icon: <Truck size={16} /> },
        { label: "Confirm Order", icon: <CheckCircle size={16} /> },
        { label: "Payment", icon: <CreditCard size={16} /> },
    ];

    return (
        <div className="w-full bg-white border-b border-gray-200 py-6 mb-8">
            <div className="max-w-4xl mx-auto flex items-center justify-center px-4">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        {/* Step Item */}
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <div className={`flex items-center justify-center transition-colors duration-300
                                ${activePath >= index 
                                    ? "text-[#BF124D]" 
                                    : "text-gray-400"}`}>
                                
                                <span className="text-sm font-bold mr-1">
                                    {index + 1}.
                                </span>
                                
                                <span className={`text-xs md:text-sm font-medium tracking-tight
                                    ${activePath === index 
                                        ? "text-[#BF124D] font-bold" 
                                        : activePath > index 
                                            ? "text-[#5A0E24]" 
                                            : "text-gray-500"}`}>
                                    {step.label}
                                </span>
                            </div>
                        </div>

                        {/* Divider Line (Except after last step) */}
                        {index !== steps.length - 1 && (
                            <div className="w-8 md:w-20 h-[1px] mx-2 md:mx-4 bg-gray-300">
                                <div 
                                    className="h-full bg-[#67B2D8] transition-all duration-700" 
                                    style={{ width: activePath > index ? '100%' : '0%' }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default CheckoutPath;