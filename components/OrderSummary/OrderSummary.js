import { useState } from 'react';

const OrderSummary = ({ 
    subtotal, 
    shippingMethod, 
    setShippingMethod, 
    discountCode, 
    setDiscountCode, 
    discount, 
    handleApplyDiscount 
}) => {
    const shippingCost = shippingMethod === 'express' ? 100 : 0;
    const gstRate = 0.18; // 18% GST
    const gstAmount = (subtotal - discount) * gstRate;
    const totalAmount = subtotal - discount + shippingCost + gstAmount;

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <select
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="border rounded-md p-1 text-sm"
                    >
                        <option value="standard">Standard - Free</option>
                        <option value="express">Express - ₹100</option>
                    </select>
                </div>

                <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                    </div>
                )}

                {handleApplyDiscount && (
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Discount Code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleApplyDiscount}
                            className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                )}

                <div className="flex justify-between font-semibold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
