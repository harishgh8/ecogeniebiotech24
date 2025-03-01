import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { motion, AnimatePresence } from "framer-motion";
import OrderSummary from '@components/OrderSummary/OrderSummary';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
        useCart();
    const router = useRouter();
    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [shippingMethod, setShippingMethod] = useState("standard");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const shippingCost = shippingMethod === "express" ? 100 : 0;
    const subtotal = getCartTotal();
    const tax = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal - discount + shippingCost + tax;

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0 && newQuantity <= 10) {
            updateQuantity(id, newQuantity);
        }
    };

    const handleApplyDiscount = () => {
        if (discountCode.toUpperCase() === "WELCOME10") {
            const discountAmount = subtotal * 0.1;
            setDiscount(discountAmount);
            alert("Discount applied successfully!");
        } else {
            alert("Invalid discount code");
            setDiscount(0);
        }
        setDiscountCode("");
    };

    const handleProceedToCheckout = () => {
        if (!isAuthenticated && !showAuthPrompt) {
            setShowAuthPrompt(true);
            return;
        }
        router.push("/checkout");
    };

    const handleGuestCheckout = () => {
        setShowAuthPrompt(false);
        router.push("/checkout");
    };

    const handleLogin = () => {
        router.push("/login?redirect=/checkout");
    };

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
                    <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                    <AnimatePresence>
                        {cart.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12"
                            >
                                <p className="text-xl mb-6">
                                    Your cart is empty
                                </p>
                                <Link
                                    href="/Products"
                                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center space-x-4 py-4 border-b last:border-b-0"
                                            >
                                                <div className="relative w-24 h-24">
                                                    <Image
                                                        src={item.image}
                                                        fill
                                                        style={{
                                                            objectFit: "contain"
                                                        }}
                                                        alt={item.title}
                                                        className="rounded-md"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-medium">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        ₹{item.price.toFixed(2)}
                                                    </p>
                                                    <div className="flex items-center mt-2">
                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                            className="p-1 rounded-md hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-16 text-center mx-2 p-1 border rounded-md"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                            className="p-1 rounded-md hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        ₹
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 text-sm mt-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                                        {/* Order Summary */}
                                        <OrderSummary
                                            subtotal={subtotal}
                                            shippingMethod={shippingMethod}
                                            setShippingMethod={setShippingMethod}
                                            discountCode={discountCode}
                                            setDiscountCode={setDiscountCode}
                                            discount={discount}
                                            handleApplyDiscount={handleApplyDiscount}
                                        />

                                        <div className="space-y-4 mt-6">
                                            <button
                                                onClick={handleProceedToCheckout}
                                                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                            >
                                                Proceed to Checkout
                                            </button>
                                            <Link
                                                href="/Products"
                                                className="block w-full py-3 text-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Authentication Prompt Modal */}
                    {showAuthPrompt && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
                            >
                                <h2 className="text-xl font-semibold mb-4">
                                    Choose Checkout Option
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Sign in to access your saved addresses and
                                    faster checkout
                                </p>
                                <div className="space-y-4">
                                    <button
                                        onClick={handleLogin}
                                        className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={handleGuestCheckout}
                                        className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Continue as Guest
                                    </button>
                                    <button
                                        onClick={() => setShowAuthPrompt(false)}
                                        className="w-full text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </SectionContainer>
        </Layout>
    );
};

export default Cart;
